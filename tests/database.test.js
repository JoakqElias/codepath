import { before, after, test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createDatabase, asVisitor } from './helpers/database.js'

let db
before(async () => { db = await createDatabase() })
after(async () => { await db?.close() })
const visitor = (sql, params, role) => asVisitor(db, sql, params, role)

test('SQL y seed: cinco unidades JS, dos lecciones publicadas, cuatro preguntas por lección', async () => {
  const units = (await visitor("select * from public.units where course_id = 'javascript' order by position")).rows
  assert.deepEqual(units.map(u => u.id), ['variables', 'operadores', 'condicionales', 'bucles', 'funciones'])
  assert.deepEqual(units.map(u => u.is_available), [true, false, false, false, false])
  const lessons = (await visitor("select id from public.lessons where unit_id = 'variables' order by position")).rows
  assert.deepEqual(lessons.map(l => l.id), ['guardar-valores', 'tipos-datos'])
  for (const lesson of lessons) {
    const { rows } = await visitor('select id from public.questions where lesson_id = $1 order by position', [lesson.id])
    assert.equal(rows.length, 4)
    for (const question of rows) {
      assert.equal((await visitor('select id from public.answer_options where question_id = $1', [question.id])).rows.length, 3)
    }
  }
  assert.equal((await visitor("select * from public.lessons where unit_id = 'operadores'")).rows.length, 0)
})
test('seed puede repetirse sin duplicar ni sobrescribir títulos editados', async () => {
  await db.query("update public.courses set name = 'JavaScript actualizado' where id = 'javascript'")
  await db.exec(await readFile(new URL('../supabase/seed.sql', import.meta.url), 'utf8'))
  assert.equal((await visitor("select name from public.courses where id = 'javascript'")).rows[0].name, 'JavaScript actualizado')
  await db.query("update public.courses set name = 'JavaScript' where id = 'javascript'")
})
test('visitantes anónimos y autenticados no pueden insertar, modificar ni borrar contenidos', async () => {
  for (const role of ['anon', 'authenticated']) {
    for (const table of ['courses', 'units', 'lessons', 'questions', 'answer_options']) {
      for (const sql of [`delete from public.${table}`, `update public.${table} set position = 99`, `insert into public.${table} (id) values ('intruso')`]) {
        await assert.rejects(visitor(sql, [], role), /permission denied/)
      }
    }
  }
})
test('soluciones privadas sin acceso directo y RLS en las seis tablas', async () => {
  for (const role of ['anon', 'authenticated']) {
    await assert.rejects(visitor('select * from private.solutions', [], role), /permission denied/)
  }
  const { rows } = await db.query("select relrowsecurity from pg_class where oid in ('public.courses'::regclass, 'public.units'::regclass, 'public.lessons'::regclass, 'public.questions'::regclass, 'public.answer_options'::regclass, 'private.solutions'::regclass)")
  assert.equal(rows.length, 6)
  assert.ok(rows.every(r => r.relrowsecurity))
})
test('RPC corrige opciones correctas e incorrectas, sin devolver el identificador de la solución', async () => {
  for (const [option, correct] of [['js-let-op-2', true], ['js-let-op-1', false]]) {
    const { rows } = await visitor('select * from public.check_practice_answer($1, $2)', ['js-let', option])
    assert.equal(rows[0].is_correct, correct)
    assert.match(rows[0].explanation, /reasignó a 3/)
    assert.deepEqual(Object.keys(rows[0]).sort(), ['explanation', 'is_correct'])
  }
})
test('RPC rechaza preguntas inexistentes, borradores y opciones de otras preguntas', async () => {
  for (const id of ['inexistente', 'js-priority']) {
    await assert.rejects(visitor('select * from public.check_practice_answer($1, $2)', [id, 'js-let-op-2']), /no disponible/)
  }
  await assert.rejects(visitor('select * from public.check_practice_answer($1, $2)', ['js-let', 'js-const-op-1']), /no pertenece/)
})
test('RLS y RPC respetan despublicar curso, unidad, lección o pregunta, y disponibilidad', async () => {
  for (const [table, id, assignment] of [
    ['courses', 'javascript', "publication_status = 'draft'"],
    ['units', 'variables', "publication_status = 'draft'"],
    ['units', 'variables', 'is_available = false'],
    ['lessons', 'guardar-valores', "publication_status = 'draft'"],
    ['questions', 'js-let', "publication_status = 'draft'"]
  ]) {
    await db.query(`update public.${table} set ${assignment} where id = $1`, [id])
    assert.equal((await visitor("select * from public.questions where id = 'js-let'")).rows.length, 0)
    assert.equal((await visitor("select * from public.answer_options where question_id = 'js-let'")).rows.length, 0)
    await assert.rejects(visitor("select * from public.check_practice_answer('js-let', 'js-let-op-2')"), /no disponible/)
    await db.query(`update public.${table} set ${assignment.startsWith('is_available') ? 'is_available = true' : "publication_status = 'published'"} where id = $1`, [id])
  }
})
test('restricciones rechazan huérfanos, posiciones repetidas, padres ambiguos y soluciones ajenas', async () => {
  for (const sql of [
    "update public.units set course_id = 'inexistente' where id = 'variables'",
    "update public.units set position = 0 where id = 'variables'",
    "update public.units set position = 2 where id = 'variables'",
    "update public.questions set intro_course_id = 'javascript' where id = 'js-let'",
    "update public.questions set lesson_id = null where id = 'js-let'",
    "update private.solutions set correct_option_id = 'js-const-op-1' where question_id = 'js-let'"
  ]) await assert.rejects(db.query(sql), /violates/)
})
test('el orden depende de position aunque cambie la posición física y los títulos', async () => {
  await db.query("update public.lessons set title = 'ZZZ' where id = 'guardar-valores'")
  const { rows } = await visitor("select id from public.lessons where unit_id = 'variables' order by position")
  assert.deepEqual(rows.map(l => l.id), ['guardar-valores', 'tipos-datos'])
})
