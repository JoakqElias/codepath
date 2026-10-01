import { computed, readonly, ref } from 'vue'
import { PROFILE_KEY, emptyProfile, restoreProfile, profileStats, addAttemptAnswer, finishAttempt } from '../domain/profile.js'

const storageAvailable = ref(true)
let initial
try { initial = restoreProfile(localStorage.getItem(PROFILE_KEY)) } catch { initial = emptyProfile(); storageAvailable.value = false }
const state = ref(initial)
export const userProfile = readonly(state)
export const canSaveProfile = readonly(storageAvailable)
export const userStats = computed(() => profileStats(state.value.attempts))

function persist () {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(state.value)); storageAvailable.value = true } catch { storageAvailable.value = false }
}
// Marca como interrumpidos los intentos que quedaron abiertos al recargar.
persist()
export function updateIdentity (name, avatar) {
  state.value.name = name.trim().slice(0, 30) || 'Aprendiz'
  if (['code', 'rocket_launch', 'pets', 'psychology'].includes(avatar)) state.value.avatar = avatar
  persist()
}
export function startAttempt ({ courseId, title, total }) {
  const id = crypto.randomUUID()
  state.value.attempts.push({ id, courseId, title, total, status: 'active', answers: [] })
  persist()
  return id
}
export function recordAnswer (id, answer) {
  state.value.attempts = addAttemptAnswer(state.value.attempts, id, answer)
  persist()
}
export function endAttempt (id, abandon = false) {
  state.value.attempts = finishAttempt(state.value.attempts, id, abandon)
  persist()
}
export function saveLessonProgress (ids, completedIds, scores) {
  state.value.passedLessons = [...ids]
  state.value.completedLessons = [...completedIds]
  state.value.lessonScores = { ...scores }
  persist()
}
