import test from 'node:test'
import assert from 'node:assert/strict'
import { javascriptUnits as units, javascriptLessons, javascriptActivities } from '../src/data/javascriptCourse.js'
import { activities as introActivities } from '../src/data/activities.js'
import { unitState, canOpenLesson, recordLessonResult } from '../src/domain/learning.js'
import { evaluateAnswer } from '../src/domain/practice.js'

const rightAnswers = lesson => lesson.activities.map(activity => evaluateAnswer(activity, activity.answerId))

test('cinco unidades, diez lecciones y veinte ejercicios con referencias y soluciones válidas', () => {
  assert.equal(units.length, 5)
  assert.equal(javascriptLessons.length, 10)
  assert.equal(javascriptActivities.length, 20)
  assert.equal(new Set([...introActivities, ...javascriptActivities].map(item => item.id)).size, 47)
  assert.equal(new Set(javascriptLessons.map(item => item.id)).size, 10)
  assert.equal(new Set(units.map(item => item.id)).size, 5)
  for (const [index, unit] of units.entries()) {
    assert.ok(unit.title && unit.description && unit.icon)
    assert.equal(unit.status, index === 0 ? 'available' : 'locked')
    for (const lesson of unit.lessons) {
      assert.ok(lesson.title && lesson.content.length && lesson.code && lesson.description)
      assert.equal(lesson.activities.length, 2)
      for (const activity of lesson.activities) {
        assert.equal(activity.lessonId, lesson.id)
        assert.equal(activity.courseId, 'javascript')
        assert.equal(activity.options.filter(option => option.id === activity.answerId).length, 1)
        for (const option of activity.options) assert.equal(evaluateAnswer(activity, option.id).isCorrect, option.id === activity.answerId)
      }
    }
  }
})

test('desbloqueo secuencial de lecciones y unidades, con progreso completo real', () => {
  let passed = []
  assert.equal(unitState(units, 'no-existe', passed), 'locked')
  assert.equal(canOpenLesson(units, 'no-existe', 'no-existe', passed), false)
  for (const [index, unit] of units.entries()) {
    assert.equal(unitState(units, unit.id, passed), 'available')
    assert.equal(canOpenLesson(units, unit.id, unit.lessons[1].id, passed), false)
    if (units[index + 1]) assert.equal(unitState(units, units[index + 1].id, passed), 'locked')
    for (const lesson of unit.lessons) {
      assert.equal(canOpenLesson(units, unit.id, lesson.id, passed), true)
      passed = recordLessonResult(units, unit.id, lesson.id, rightAnswers(lesson), passed)
    }
    assert.equal(unitState(units, unit.id, passed), 'completed')
  }
  assert.equal(passed.length, 10)
  assert.equal(new Set(passed).size, 10)
})

test('no se aprueba con respuestas incompletas, incorrectas, duplicadas, ajenas o contenido bloqueado', () => {
  const unit = units[0], lesson = unit.lessons[0], correct = rightAnswers(lesson)
  const wrong = lesson.activities.map(activity => evaluateAnswer(activity, activity.options.find(option => option.id !== activity.answerId).id))
  for (const answers of [[], correct.slice(0, 1), wrong, [correct[0], correct[0]], [...correct].reverse(), wrong.map(answer => ({ ...answer, isCorrect: true }))]) {
    assert.deepEqual(recordLessonResult(units, unit.id, lesson.id, answers, []), [])
  }
  assert.deepEqual(recordLessonResult(units, units[1].id, units[1].lessons[0].id, rightAnswers(units[1].lessons[0]), []), [])
  assert.deepEqual(recordLessonResult(units, unit.id, unit.lessons[1].id, rightAnswers(unit.lessons[1]), []), [])
  const passed = recordLessonResult(units, unit.id, lesson.id, correct, [])
  assert.deepEqual(recordLessonResult(units, unit.id, lesson.id, correct, passed), passed)
  assert.deepEqual(recordLessonResult(units, unit.id, lesson.id, wrong, passed), passed)
})
