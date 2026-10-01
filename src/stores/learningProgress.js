import { computed } from 'vue'
import { getUnits } from '../services/contentRepository.js'
import { lessonResult, recordLessonResult, recordLessonCompletion, recordBestScore } from '../domain/learning.js'
import { userProfile, saveLessonProgress } from './userProfile.js'
export const completedLessons = computed(() => userProfile.value.completedLessons)
// Las guardas usan finalización, no perfección.
export const learningProgress = completedLessons
export const lessonScores = computed(() => userProfile.value.lessonScores)
export function completeLesson (unitId, lessonId, answers, courseId = 'javascript') {
  const units = getUnits(courseId)
  const result = lessonResult(units, unitId, lessonId, answers, completedLessons.value)
  if (!result) return
  saveLessonProgress(
    recordLessonResult(units, unitId, lessonId, answers, userProfile.value.passedLessons, completedLessons.value),
    recordLessonCompletion(units, unitId, lessonId, answers, completedLessons.value),
    recordBestScore(lessonScores.value, lessonId, result)
  )
}
