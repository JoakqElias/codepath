-- Ejecutar una vez como administrador (SQL Editor de Supabase).
begin;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.courses (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  name text not null check (btrim(name) <> ''),
  description text not null default '',
  category text not null default '',
  visual_label text not null default '',
  visual_caption text not null default '',
  position integer not null unique check (position > 0),
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now()
);
create table public.units (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  course_id text not null references public.courses(id) on delete cascade,
  title text not null check (btrim(title) <> ''),
  description text not null default '',
  icon text not null default 'auto_stories',
  position integer not null check (position > 0),
  is_available boolean not null default false,
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published', 'archived')),
  unique (course_id, position)
);
create table public.lessons (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  unit_id text not null references public.units(id) on delete cascade,
  title text not null check (btrim(title) <> ''),
  description text not null default '',
  content text[] not null check (cardinality(content) > 0),
  code text not null default '',
  position integer not null check (position > 0),
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published', 'archived')),
  unique (unit_id, position)
);
create table public.questions (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  lesson_id text references public.lessons(id) on delete cascade,
  intro_course_id text references public.courses(id) on delete cascade,
  title text check (title is null or btrim(title) <> ''),
  prompt text not null check (btrim(prompt) <> ''),
  -- NULL hereda concepto/código de la lección; evita duplicar esos textos.
  concept text,
  code text,
  position integer not null check (position > 0),
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published', 'archived')),
  constraint question_one_parent check (num_nonnulls(lesson_id, intro_course_id) = 1),
  unique (lesson_id, position),
  unique (intro_course_id, position)
);
create table public.answer_options (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  question_id text not null references public.questions(id) on delete cascade,
  label text not null check (btrim(label) <> ''),
  position integer not null check (position > 0),
  unique (question_id, position),
  unique (question_id, id)
);
create table private.solutions (
  question_id text primary key references public.questions(id) on delete cascade,
  correct_option_id text not null,
  explanation text not null check (btrim(explanation) <> ''),
  foreign key (question_id, correct_option_id)
    references public.answer_options(question_id, id) on delete cascade
);

alter table public.courses enable row level security;
alter table public.units enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.answer_options enable row level security;
alter table private.solutions enable row level security;
revoke all on public.courses, public.units, public.lessons, public.questions, public.answer_options from public, anon, authenticated;
revoke all on private.solutions from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.courses, public.units, public.lessons, public.questions, public.answer_options to anon, authenticated;

create policy published_courses on public.courses for select to anon, authenticated
  using (publication_status = 'published');
-- Las unidades publicadas pueden anunciarse como no disponibles.
create policy published_units on public.units for select to anon, authenticated
  using (publication_status = 'published' and exists (
    select 1 from public.courses c where c.id = units.course_id));
create policy published_lessons on public.lessons for select to anon, authenticated
  using (publication_status = 'published' and exists (
    select 1 from public.units u where u.id = lessons.unit_id and u.is_available));
create policy published_questions on public.questions for select to anon, authenticated
  using (publication_status = 'published' and (
    exists (select 1 from public.lessons l where l.id = questions.lesson_id)
    or exists (select 1 from public.courses c where c.id = questions.intro_course_id)));
create policy published_options on public.answer_options for select to anon, authenticated
  using (exists (select 1 from public.questions q where q.id = answer_options.question_id));
-- Sin políticas de escritura ni políticas públicas sobre private.solutions.

create function public.check_practice_answer(p_question_id text, p_option_id text)
returns table (is_correct boolean, explanation text)
language plpgsql stable security definer set search_path = ''
as $$
begin
  -- SECURITY DEFINER requiere comprobar explícitamente toda la cadena publicada.
  if not exists (
    select 1 from public.questions q
    where q.id = p_question_id and q.publication_status = 'published' and (
      exists (select 1 from public.lessons l
        join public.units u on u.id = l.unit_id
        join public.courses c on c.id = u.course_id
        where l.id = q.lesson_id and l.publication_status = 'published'
          and u.publication_status = 'published' and u.is_available
          and c.publication_status = 'published')
      or exists (select 1 from public.courses c
        where c.id = q.intro_course_id and c.publication_status = 'published'))
  ) then
    raise exception 'Pregunta inexistente o no disponible.' using errcode = 'P0002';
  end if;
  if not exists (select 1 from public.answer_options o
    where o.id = p_option_id and o.question_id = p_question_id) then
    raise exception 'La opción no pertenece a esta pregunta.' using errcode = '22023';
  end if;
  if not exists (select 1 from private.solutions s where s.question_id = p_question_id) then
    raise exception 'La pregunta todavía no tiene solución configurada.' using errcode = '55000';
  end if;
  return query select s.correct_option_id = p_option_id, s.explanation
    from private.solutions s where s.question_id = p_question_id;
end;
$$;
revoke all on function public.check_practice_answer(text, text) from public, anon, authenticated;
grant execute on function public.check_practice_answer(text, text) to anon, authenticated;
comment on function public.check_practice_answer(text, text) is
  'Corrección de práctica; no valida partidas ni puntajes oficiales. No devuelve el conjunto de soluciones.';
commit;
