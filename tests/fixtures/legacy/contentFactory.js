export const question = (id, prompt, labels, answer, explanation, code) => ({
  id, question: prompt, options: labels.map((label, i) => ({ id: `${id}-op-${i + 1}`, questionId: id, label })),
  answerId: `${id}-op-${answer + 1}`, explanation, code
})

export function makeLesson (courseId, id, title, description, content, code, questions) {
  return { id, title, description, content, code, activities: questions.map(item => ({
    ...item, courseId, lessonId: id, type: 'single-choice', title: item.question,
    concept: content.join(' '), code: item.code || code
  })) }
}

export function publishUnits (courseId, units) {
  return units.map((unit, i) => ({ ...unit, courseId, position: i + 1, publicationStatus: 'published',
    lessons: unit.lessons.map((lesson, j) => ({ ...lesson, unitId: unit.id, position: j + 1, publicationStatus: 'published',
      activities: lesson.activities.map((activity, k) => ({ ...activity, position: k + 1, publicationStatus: 'published' })) }))
  }))
}
