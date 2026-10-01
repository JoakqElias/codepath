export const PROFILE_KEY = 'codepath.profile.v1'

export function emptyProfile () {
  return { version: 1, name: 'Aprendiz', avatar: 'code', attempts: [], passedLessons: [], completedLessons: [], lessonScores: {} }
}

// Datos locales: se descartan campos inválidos y se recupera un perfil vacío si falla el JSON.
export function restoreProfile (raw) {
  const fallback = emptyProfile()
  try {
    const data = JSON.parse(raw)
    if (data?.version !== 1 || !Array.isArray(data.attempts)) return fallback
    const ids = new Set()
    const attempts = data.attempts.filter(a => {
      if (!a || typeof a.id !== 'string' || ids.has(a.id) || typeof a.courseId !== 'string' ||
        typeof a.title !== 'string' || !Number.isInteger(a.total) || a.total < 1 || a.total > 100 ||
        !['active', 'completed', 'abandoned'].includes(a.status) || !Array.isArray(a.answers) ||
        a.answers.length > a.total || !a.answers.every(b => typeof b?.activityId === 'string' && typeof b.isCorrect === 'boolean') ||
        new Set(a.answers.map(b => b.activityId)).size !== a.answers.length ||
        (a.status === 'completed' && a.answers.length !== a.total)) return false
      ids.add(a.id)
      return true
    }).map(a => ({ id: a.id, courseId: a.courseId, title: a.title, total: a.total,
      status: a.status === 'active' ? 'abandoned' : a.status,
      answers: a.answers.map(b => ({ activityId: b.activityId, isCorrect: b.isCorrect })) }))
    const passedLessons = Array.isArray(data.passedLessons) ? [...new Set(data.passedLessons.filter(id => typeof id === 'string'))] : []
    const completedLessons = [...new Set([...passedLessons, ...(Array.isArray(data.completedLessons) ? data.completedLessons.filter(id => typeof id === 'string') : [])])]
    const scores = data.lessonScores && typeof data.lessonScores === 'object' && !Array.isArray(data.lessonScores) ? data.lessonScores : {}
    const lessonScores = Object.fromEntries(Object.entries(scores).filter(([id, score]) =>
      completedLessons.includes(id) && Number.isFinite(score) && score >= 0 && score <= 100))
    // Las aprobaciones históricas ya acreditaban un intento perfecto.
    for (const id of passedLessons) Object.defineProperty(lessonScores, id, { value: 100, enumerable: true, writable: true, configurable: true })
    return { ...fallback, name: typeof data.name === 'string' ? data.name.trim().slice(0, 30) || 'Aprendiz' : fallback.name,
      avatar: ['code', 'rocket_launch', 'pets', 'psychology'].includes(data.avatar) ? data.avatar : fallback.avatar,
      attempts, passedLessons, completedLessons, lessonScores }
  } catch { return fallback }
}

export function attemptPassed (attempt) {
  return attempt.status === 'completed' && attempt.answers.filter(a => a.isCorrect).length / attempt.total > 0.4
}

export function profileStats (attempts) {
  let answered = 0; let correct = 0; let streak = 0; let bestStreak = 0; let completed = 0
  for (const attempt of attempts) {
    answered += attempt.answers.length
    correct += attempt.answers.filter(a => a.isCorrect).length
    if (attempt.status === 'completed') {
      completed++
      streak = attemptPassed(attempt) ? streak + 1 : 0
      bestStreak = Math.max(bestStreak, streak)
    } else if (attempt.status === 'abandoned' && attempt.answers.length) streak = 0
  }
  const xp = correct * 10
  const level = Math.floor(xp / 100) + 1
  return { answered, correct, completed, streak, bestStreak, xp, level,
    levelProgress: xp % 100, nextLevelXp: 100 - xp % 100,
    skill: answered ? Math.round(correct / answered * 1000) / 10 : null,
    title: level >= 10 ? 'Explorador avanzado' : level >= 5 ? 'Constructor' : level >= 3 ? 'Explorador' : 'Aprendiz' }
}

export function addAttemptAnswer (attempts, id, answer) {
  return attempts.map(attempt => attempt.id !== id || attempt.status !== 'active' ||
    attempt.answers.length >= attempt.total || attempt.answers.some(a => a.activityId === answer.activityId)
    ? attempt : { ...attempt, answers: [...attempt.answers, { activityId: answer.activityId, isCorrect: answer.isCorrect }] })
}

export function finishAttempt (attempts, id, abandon = false) {
  return attempts.map(a => a.id !== id || a.status !== 'active' ? a :
    abandon ? { ...a, status: 'abandoned' } :
      a.answers.length === a.total ? { ...a, status: 'completed' } : a)
}
