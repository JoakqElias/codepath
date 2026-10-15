import test from 'node:test'
import assert from 'node:assert/strict'
import { lessonResult, unitState, canOpenLesson, recordBestScore, recordLessonCompletion } from '../src/domain/learning.js'
import { summarizeAnswers } from '../src/domain/practice.js'

const activities = ['q1', 'q2', 'q3'].map(id => ({ id, options: [{ id: id + '-a' }, { id: id + '-b' }] }))
const units = [{ id: 'u1', isAvailable: true, lessons: [{ id: 'l1', activities }, { id: 'l2', activities }] },
  { id: 'u2', isAvailable: false, lessons: [] }]
const answers = activities.map(q => ({ activityId: q.id, answerId: q.id + '-a', isCorrect: true }))

test('el resultado de práctica usa correcciones del servidor y no requiere soluciones', () => {
  assert.deepEqual(lessonResult(units, 'u1', 'l1', answers, []), { correct: 3, total: 3, percentage: 100 })
  const mixed = answers.map((a, i) => ({ ...a, isCorrect: i !== 0 }))
  assert.equal(lessonResult(units, 'u1', 'l1', mixed, []).percentage, 66.7)
  assert.deepEqual(summarizeAnswers(mixed), { answered: 3, correct: 2, incorrect: 1 })
})
test('solo terminar un intento válido desbloquea, incluso con cero aciertos', () => {
  assert.equal(canOpenLesson(units, 'u1', 'l2', []), false)
  const done = recordLessonCompletion(units, 'u1', 'l1', answers.map(a => ({ ...a, isCorrect: false })), [])
  assert.equal(canOpenLesson(units, 'u1', 'l2', done), true)
  assert.equal(unitState(units, 'u2', done), 'unavailable')
  assert.equal(canOpenLesson(units, 'u2', 'inexistente', done), false)
})
test('rechaza respuestas incompletas, ajenas, duplicadas o sin corrección', () => {
  for (const invalid of [answers.slice(1), [answers[0], answers[0], answers[0]], answers.map(a => ({ ...a, answerId: 'ajena' })),
    answers.map(({ isCorrect, ...a }) => a)]) assert.equal(lessonResult(units, 'u1', 'l1', invalid, []), null)
  assert.equal(lessonResult(units, 'u1', 'l2', answers, []), null)
})
test('la mejor marca se conserva al repetir con menor porcentaje', () => {
  assert.equal(recordBestScore({ l1: 100 }, 'l1', { percentage: 66.7 }).l1, 100)
  assert.equal(recordBestScore({ l1: 66.7 }, 'l1', { percentage: 100 }).l1, 100)
})
