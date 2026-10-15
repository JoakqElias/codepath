import { before, after, test } from 'node:test'
import assert from 'node:assert/strict'
import { createClient } from '@supabase/supabase-js'
import { createContentRepository } from '../src/services/contentRepository.js'
import { startTestApi } from './helpers/apiServer.js'

let api, repository
before(async () => {
  api = await startTestApi()
  repository = createContentRepository(() => createClient(api.url, 'sb_publishable_LOCAL_TEST', { auth: { persistSession: false } }))
})
after(async () => { await api?.close() })

test('cliente Supabase: consultas por FK ordenadas y sin soluciones en los objetos públicos', async () => {
  assert.equal((await repository.getCourses()).length, 9)
  const { course, units, lesson, activities } = await repository.getLessonContent('javascript', 'variables', 'guardar-valores')
  assert.equal(course.id, 'javascript')
  assert.equal(units.length, 5)
  assert.equal(lesson.id, 'guardar-valores')
  assert.equal(activities.length, 4)
  assert.ok(units.every(u => u.courseId === course.id))
  assert.ok(activities.every(q => q.lessonId === lesson.id && !('answerId' in q) && !('explanation' in q)))
  for (const q of activities) assert.ok(q.options.every(o => o.question_id === q.id))
  assert.deepEqual(units.slice(1).map(u => u.lessons), [[], [], [], []])
})
test('IDs inexistentes o combinaciones de otro curso/unidad no muestran contenidos ajenos', async () => {
  assert.equal((await repository.getCourseTree('inexistente')).course, null)
  assert.equal((await repository.getLessonContent('css', 'variables', 'guardar-valores')).lesson, null)
  assert.equal((await repository.getLessonContent('javascript', 'variables', 'tipos-que-no-existen')).lesson, null)
  assert.deepEqual(await repository.getQuestions('inexistente'), [])
  assert.deepEqual(await repository.getOptions('inexistente'), [])
})
test('prácticas introductorias mantienen una relación exclusiva con su curso', async () => {
  const { activities } = await repository.getIntroContent('html')
  assert.equal(activities.length, 3)
  assert.ok(activities.every(q => q.intro_course_id === 'html' && q.lesson_id === null))
})
test('corrección RPC: respuesta, errores de validación y reintento sin inventar un incorrecto', async () => {
  assert.equal((await repository.checkAnswer('js-let', 'js-let-op-2')).isCorrect, true)
  assert.equal((await repository.checkAnswer('js-let', 'js-let-op-1')).isCorrect, false)
  await assert.rejects(repository.checkAnswer('js-let', 'js-const-op-1'))
  await fetch(api.url + '/__test/fail-rpc', { method: 'POST' })
  await assert.rejects(repository.checkAnswer('js-let', 'js-let-op-2'))
  assert.equal((await repository.checkAnswer('js-let', 'js-let-op-2')).isCorrect, true)
})
test('volver a consultar obtiene el título modificado desde la base', async () => {
  await api.db.query("update public.courses set name = 'Título remoto editado' where id = 'javascript'")
  assert.equal((await repository.getCourse('javascript')).name, 'Título remoto editado')
})
