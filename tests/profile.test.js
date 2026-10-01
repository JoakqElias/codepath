import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyProfile, restoreProfile, profileStats, attemptPassed, addAttemptAnswer, finishAttempt } from '../src/domain/profile.js'

const attempt = (correct, total = 5, id = 'one', status = 'completed') => ({ id, courseId: 'html', title: 'HTML', total, status,
  answers: Array.from({ length: total }, (_, i) => ({ activityId: String(i), isCorrect: i < correct })) })

test('habilidad pondera todas las respuestas y los errores reducen el porcentaje', () => {
  assert.equal(profileStats([]).skill, null)
  assert.equal(profileStats([attempt(5)]).skill, 100)
  const stats = profileStats([attempt(5), attempt(0, 2, 'two')])
  assert.equal(stats.skill, 71.4)
  assert.equal(stats.xp, 50)
  assert.equal(stats.level, 1)
  assert.equal(profileStats([attempt(5), attempt(5, 5, 'two')]).level, 2)
})
test('racha estrictamente mayor a 2/5, mejor racha e interrupciones', () => {
  assert.equal(attemptPassed(attempt(2)), false)
  assert.equal(attemptPassed(attempt(3)), true)
  assert.equal(attemptPassed(attempt(1, 2)), true)
  assert.equal(attemptPassed(attempt(1, 3)), false)
  const stats = profileStats([attempt(5), attempt(3, 5, 'two'), attempt(2, 5, 'three'), attempt(5, 5, 'four')])
  assert.equal(stats.streak, 1)
  assert.equal(stats.bestStreak, 2)
  assert.equal(profileStats([attempt(5), attempt(1, 2, 'two', 'abandoned')]).streak, 0)
})
test('una respuesta y un resultado se contabilizan una sola vez', () => {
  const active = [{ ...attempt(0, 2, 'one', 'active'), answers: [] }]
  const answer = { activityId: 'a', isCorrect: true }
  const once = addAttemptAnswer(active, 'one', answer)
  assert.deepEqual(addAttemptAnswer(once, 'one', answer), once)
  assert.equal(finishAttempt(once, 'one')[0].status, 'active')
  const full = addAttemptAnswer(once, 'one', { activityId: 'b', isCorrect: false })
  const finished = finishAttempt(full, 'one')
  assert.deepEqual(finishAttempt(finished, 'one'), finished)
  assert.deepEqual(finishAttempt(finished, 'one', true), finished)
  assert.deepEqual(addAttemptAnswer(finished, 'one', { activityId: 'c', isCorrect: true }), finished)
})
test('recupera almacenamiento corrupto y convierte intentos activos en interrumpidos', () => {
  assert.deepEqual(restoreProfile('bad json'), emptyProfile())
  assert.deepEqual(restoreProfile('{"version":2}'), emptyProfile())
  const restored = restoreProfile(JSON.stringify({ ...emptyProfile(), name: '  Joaco  ', attempts: [attempt(1, 2, 'one', 'active'), null] }))
  assert.equal(restored.name, 'Joaco')
  assert.equal(restored.attempts.length, 1)
  assert.equal(restored.attempts[0].status, 'abandoned')
  assert.equal(profileStats(restored.attempts).correct, 1)
})
