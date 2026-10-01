// Terminar habilita el siguiente paso; el dominio del contenido se expresa con aciertos.
export function unitState (units, unitId, completedLessons) {
  const index = units.findIndex(unit => unit.id === unitId)
  if (index === -1) return 'locked'
  const completed = unit => unit.lessons.length > 0 && unit.lessons.every(lesson => completedLessons.includes(lesson.id))
  if (!units.slice(0, index).every(completed)) return 'locked'
  return completed(units[index]) ? 'completed' : 'available'
}
export function canOpenLesson (units, unitId, lessonId, completedLessons) {
  const unit = units.find(unit => unit.id === unitId)
  const index = unit?.lessons.findIndex(lesson => lesson.id === lessonId) ?? -1
  return index >= 0 && unitState(units, unitId, completedLessons) !== 'locked' &&
    unit.lessons.slice(0, index).every(lesson => completedLessons.includes(lesson.id))
}
export function lessonResult (units, unitId, lessonId, answers, completedLessons) {
  const lesson = units.find(unit => unit.id === unitId)?.lessons.find(item => item.id === lessonId)
  if (!lesson || !canOpenLesson(units, unitId, lessonId, completedLessons) || !lesson.activities.length ||
      answers.length !== lesson.activities.length || !lesson.activities.every((activity, i) =>
        answers[i]?.activityId === activity.id && activity.options.some(option => option.id === answers[i]?.answerId))) return null
  const correct = lesson.activities.filter((activity, i) => activity.answerId === answers[i].answerId).length
  return { correct, total: lesson.activities.length, percentage: Math.round(correct / lesson.activities.length * 1000) / 10 }
}
export function recordLessonResult (units, unitId, lessonId, answers, passedLessons, completedLessons = passedLessons) {
  const result = lessonResult(units, unitId, lessonId, answers, completedLessons)
  return result?.percentage === 100 ? [...new Set([...passedLessons, lessonId])] : [...passedLessons]
}
export function recordLessonCompletion (units, unitId, lessonId, answers, completedLessons) {
  return lessonResult(units, unitId, lessonId, answers, completedLessons)
    ? [...new Set([...completedLessons, lessonId])] : [...completedLessons]
}
export function recordBestScore (scores, lessonId, result) {
  if (!result || (Object.hasOwn(scores, lessonId) && scores[lessonId] >= result.percentage)) return { ...scores }
  return { ...scores, [lessonId]: result.percentage }
}
export function averageScore (lessons, scores) {
  return lessons.length ? Math.round(lessons.reduce((sum, lesson) => sum + (scores[lesson.id] || 0), 0) / lessons.length * 10) / 10 : 0
}
