// Reglas puras: el estado visible se deriva de lecciones aprobadas, no del catálogo.
export function unitState (units, unitId, passedLessons) {
  const index = units.findIndex(unit => unit.id === unitId)
  if (index === -1) return 'locked'
  const completed = unit => unit.lessons.length > 0 && unit.lessons.every(lesson => passedLessons.includes(lesson.id))
  if (!units.slice(0, index).every(completed)) return 'locked'
  return completed(units[index]) ? 'completed' : 'available'
}

export function canOpenLesson (units, unitId, lessonId, passedLessons) {
  const unit = units.find(unit => unit.id === unitId)
  const index = unit?.lessons.findIndex(lesson => lesson.id === lessonId) ?? -1
  return index >= 0 && unitState(units, unitId, passedLessons) !== 'locked' &&
    unit.lessons.slice(0, index).every(lesson => passedLessons.includes(lesson.id))
}

export function recordLessonResult (units, unitId, lessonId, answers, passedLessons) {
  const lesson = units.find(unit => unit.id === unitId)?.lessons.find(lesson => lesson.id === lessonId)
  if (!lesson || !canOpenLesson(units, unitId, lessonId, passedLessons)) return [...passedLessons]
  const passed = lesson.activities.length > 0 && answers.length === lesson.activities.length &&
    lesson.activities.every((activity, index) => answers[index]?.activityId === activity.id && answers[index]?.answerId === activity.answerId)
  return passed ? [...new Set([...passedLessons, lessonId])] : [...passedLessons]
}
