import { readonly, ref } from 'vue'
import { javascriptUnits } from '../data/javascriptCourse.js'
import { recordLessonResult } from '../domain/learning.js'

// Estado compartido en memoria: persiste al navegar, se borra al recargar.
const passedLessons = ref([])
export const learningProgress = readonly(passedLessons)
export function completeLesson (unitId, lessonId, answers) {
  passedLessons.value = recordLessonResult(javascriptUnits, unitId, lessonId, answers, passedLessons.value)
}
