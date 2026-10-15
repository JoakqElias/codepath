export function summarizeAnswers (answers) {
  const correct = answers.filter(answer => answer.isCorrect).length
  return { answered: answers.length, correct, incorrect: answers.length - correct }
}
