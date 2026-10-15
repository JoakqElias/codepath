-- Ejecutar como administrador después de la carga y antes de publicar cambios.
-- Resultado esperado: cero filas en cada consulta de inconsistencias.

-- Lecciones publicadas sin tres preguntas publicadas como mínimo.
select l.id, count(q.id) as published_questions
from public.lessons l
left join public.questions q on q.lesson_id = l.id and q.publication_status = 'published'
where l.publication_status = 'published'
group by l.id having count(q.id) < 3;

-- Preguntas publicadas incompletas: dos opciones como mínimo y una solución.
select q.id
from public.questions q
left join public.answer_options o on o.question_id = q.id
left join private.solutions s on s.question_id = q.id
where q.publication_status = 'published'
group by q.id, s.question_id
having count(o.id) < 2 or s.question_id is null;

-- Unidades anunciadas como disponibles sin lecciones publicadas.
select u.id from public.units u
where u.is_available and u.publication_status = 'published'
and not exists (select 1 from public.lessons l where l.unit_id = u.id and l.publication_status = 'published');

-- RLS: las seis tablas deben mostrar true.
select n.nspname as schema, c.relname as table_name, c.relrowsecurity as rls_enabled
from pg_class c join pg_namespace n on n.oid = c.relnamespace
where (n.nspname = 'public' and c.relname in ('courses', 'units', 'lessons', 'questions', 'answer_options'))
or (n.nspname = 'private' and c.relname = 'solutions');

-- Verificación pública de permisos dentro de una transacción sin escrituras.
begin;
set local role anon;
select has_table_privilege(current_user, 'public.courses', 'SELECT') as can_read,
  has_table_privilege(current_user, 'public.courses', 'INSERT') as can_insert,
  has_table_privilege(current_user, 'public.courses', 'UPDATE') as can_update,
  has_table_privilege(current_user, 'public.courses', 'DELETE') as can_delete,
  has_schema_privilege(current_user, 'private', 'USAGE') as can_access_solutions;
-- Esperado: true, false, false, false, false.
select * from public.check_practice_answer('js-let', 'js-let-op-2');
-- Esperado: true y su explicación.
rollback;
