import test from 'node:test'
import assert from 'node:assert/strict'
import { getCourses, getUnits, findLesson } from '../src/services/contentRepository.js'
import { activities } from '../src/data/activities.js'
import { lessonResult, recordLessonCompletion, recordBestScore, canOpenLesson, unitState, averageScore } from '../src/domain/learning.js'
import { evaluateAnswer } from '../src/domain/practice.js'
import { emptyProfile, restoreProfile } from '../src/domain/profile.js'

const answersFor = (lesson, correctCount) => lesson.activities.map((activity, i) => evaluateAnswer(activity,
  i < correctCount ? activity.answerId : activity.options.find(option => option.id !== activity.answerId).id))

test('nueve recorridos: 26 lecciones, 104 actividades únicas y cuatro preguntas en cada lección', () => {
  const ids = new Set(activities.map(a => a.id)); let lessons = 0; let count = 0
  const remember = id => { assert.ok(!ids.has(id), id); ids.add(id) }
  for (const course of getCourses()) {
    assert.equal(course.status, 'available')
    for (const unit of getUnits(course.id)) {
      remember(unit.id); assert.equal(unit.courseId, course.id)
      for (const lesson of unit.lessons) {
        remember(lesson.id); lessons++
        assert.equal(lesson.unitId, unit.id)
        assert.ok(lesson.content.length && lesson.code)
        assert.equal(lesson.activities.length, 4)
        for (const activity of lesson.activities) {
          remember(activity.id); count++
          assert.equal(activity.lessonId, lesson.id)
          assert.equal(activity.courseId, course.id)
          assert.ok(activity.question && activity.explanation && activity.options.length >= 2)
          assert.equal(activity.options.filter(o => o.id === activity.answerId).length, 1)
          for (const option of activity.options) { remember(option.id); assert.equal(option.questionId, activity.id) }
        }
      }
    }
  }
  assert.equal(lessons, 26); assert.equal(count, 104)
  assert.equal(findLesson('html-fundamentos', 'html-estructura', 'css'), undefined)
})

test('el 75 % finalizado desbloquea todas las lecciones y unidades, también con cero aciertos', () => {
  for (const correctCount of [3, 0]) {
    for (const course of getCourses()) {
      const units = getUnits(course.id); let completed = []
      for (const unit of units) {
        assert.equal(unitState(units, unit.id, completed), 'available')
        for (const lesson of unit.lessons) {
          assert.ok(canOpenLesson(units, unit.id, lesson.id, completed))
          const answers = answersFor(lesson, correctCount)
          assert.equal(lessonResult(units, unit.id, lesson.id, answers, completed).percentage, correctCount * 25)
          completed = recordLessonCompletion(units, unit.id, lesson.id, answers, completed)
        }
        assert.equal(unitState(units, unit.id, completed), 'completed')
      }
    }
  }
})

test('reintentar mejora 75 a 100; ni empeorar ni duplicar el resultado baja la mejor marca', () => {
  const units = getUnits('html'), unit = units[0], lesson = unit.lessons[0]
  const result = n => lessonResult(units, unit.id, lesson.id, answersFor(lesson, n), [])
  let scores = recordBestScore({}, lesson.id, result(3))
  assert.equal(scores[lesson.id], 75)
  assert.equal(recordBestScore(scores, lesson.id, result(1))[lesson.id], 75)
  scores = recordBestScore(scores, lesson.id, result(4))
  assert.equal(scores[lesson.id], 100)
  assert.deepEqual(recordBestScore(scores, lesson.id, result(3)), scores)
  assert.deepEqual(recordBestScore(scores, lesson.id, result(4)), scores)
  assert.equal(averageScore(unit.lessons, scores), 50)
})

test('un intento incompleto, duplicado, inválido o bloqueado no registra porcentaje ni finalización', () => {
  const units = getUnits(), unit = units[0], lesson = unit.lessons[0], valid = answersFor(lesson, 4)
  for (const answers of [[], valid.slice(1), [valid[0], valid[0], valid[0], valid[0]], valid.map(a => ({ ...a, answerId: 'no-existe' }))]) {
    assert.equal(lessonResult(units, unit.id, lesson.id, answers, []), null)
    assert.deepEqual(recordLessonCompletion(units, unit.id, lesson.id, answers, []), [])
  }
  const next = unit.lessons[1]
  assert.equal(lessonResult(units, unit.id, next.id, answersFor(next, 4), []), null)
  assert.equal(lessonResult(units, unit.id, lesson.id, answersFor(lesson, 0).map(a => ({ ...a, isCorrect: true })), []).percentage, 0)
})

test('restaurar conserva porcentajes válidos y logros antiguos sin inventar notas faltantes', () => {
  const profile = restoreProfile(JSON.stringify({ ...emptyProfile(), passedLessons: ['anterior'],
    completedLessons: ['parcial', 'sin-nota', 'mala'], lessonScores: { parcial: 75, mala: 400, ajena: 100 } }))
  assert.deepEqual(profile.lessonScores, { parcial: 75, anterior: 100 })
  assert.ok(profile.completedLessons.includes('anterior'))
})
