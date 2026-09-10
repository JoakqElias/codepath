import test from 'node:test'
import assert from 'node:assert/strict'
import { courses } from '../src/data/courses.js'
import { activities, activitiesForCourse } from '../src/data/activities.js'
import { evaluateAnswer, summarizeAnswers } from '../src/domain/practice.js'

test('el catálogo contiene exactamente las nueve tecnologías con identificadores estables', () => {
  assert.deepEqual(courses.map(course => course.id), ['html', 'css', 'javascript', 'vue', 'react', 'sql', 'php', 'java', 'node'])
  for (const course of courses) {
    assert.ok(course.name && course.description && course.visual.label && course.visual.caption)
    assert.equal(course.status, 'coming-soon')
    assert.equal(course.entryRoute, null)
    assert.deepEqual(course.units, [])
    assert.equal('progress' in course, false)
  }
})

test('cada tecnología tiene tres actividades válidas y no hay actividades huérfanas', () => {
  assert.equal(activities.length, 27)
  assert.equal(new Set(activities.map(activity => activity.id)).size, 27)
  for (const course of courses) assert.equal(activitiesForCourse(course.id).length, 3)
  assert.deepEqual(activitiesForCourse('inexistente'), [])
  for (const activity of activities) {
    assert.ok(courses.some(course => course.id === activity.courseId))
    assert.equal(activity.type, 'single-choice')
    assert.ok(activity.title && activity.concept && activity.code && activity.question && activity.explanation)
    assert.ok(activity.options.length >= 2)
    assert.equal(new Set(activity.options.map(option => option.id)).size, activity.options.length)
    assert.equal(activity.options.filter(option => option.id === activity.answerId).length, 1)
  }
})

test('las 81 opciones se corrigen y siempre devuelven la explicación de su actividad', () => {
  for (const activity of activities) {
    for (const option of activity.options) {
      const result = evaluateAnswer(activity, option.id)
      assert.equal(result.isCorrect, option.id === activity.answerId)
      assert.equal(result.explanation, activity.explanation)
      assert.equal(result.activityId, activity.id)
      assert.equal(result.answerId, option.id)
    }
    assert.throws(() => evaluateAnswer(activity, null), /opción válida/)
    assert.throws(() => evaluateAnswer(activity, 'inexistente'), /opción válida/)
  }
})

test('el resultado usa solo las respuestas reales, incluidos cero aciertos y sesión vacía', () => {
  assert.deepEqual(summarizeAnswers([]), { answered: 0, correct: 0, incorrect: 0 })
  const sample = activitiesForCourse('html')
  const right = sample.map(activity => evaluateAnswer(activity, activity.answerId))
  const wrong = sample.map(activity => evaluateAnswer(activity, activity.options.find(option => option.id !== activity.answerId).id))
  assert.deepEqual(summarizeAnswers(right), { answered: 3, correct: 3, incorrect: 0 })
  assert.deepEqual(summarizeAnswers(wrong), { answered: 3, correct: 0, incorrect: 3 })
  assert.deepEqual(summarizeAnswers([right[0], wrong[1], right[2]]), { answered: 3, correct: 2, incorrect: 1 })
})
