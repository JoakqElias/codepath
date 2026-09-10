export function evaluateAnswer (activity, answerId) {
  if (!activity.options.some(option => option.id === answerId)) {
    throw new Error('Seleccioná una opción válida.')
  }
  return {
    activityId: activity.id,
    answerId,
    isCorrect: answerId === activity.answerId,
    explanation: activity.explanation
  }
}

export function summarizeAnswers (answers) {
  const correct = answers.filter(answer => answer.isCorrect).length
  return { answered: answers.length, correct, incorrect: answers.length - correct }
}
