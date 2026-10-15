// Migración reproducible de la entrega anterior. Nunca se importa en el frontend.
import { writeFile } from 'node:fs/promises'
import { courses } from '../tests/fixtures/legacy/courses.js'
import { activities as intros } from '../tests/fixtures/legacy/activities.js'

const quote = value => value == null ? 'null' : typeof value === 'boolean' || typeof value === 'number'
  ? String(value) : "'" + String(value).replaceAll("'", "''") + "'"
const array = values => 'array[' + values.map(quote).join(', ') + ']::text[]'
const tables = { courses: [], units: [], lessons: [], questions: [], answer_options: [], 'private.solutions': [] }
function addQuestion (a, lesson, course, position, status) {
  const options = a.options.map((option, i) => ({ ...option, newId: `${a.id}-op-${i + 1}` }))
  tables.questions.push([a.id, lesson?.id, course?.id, a.title === a.question ? null : a.title, a.question,
    lesson ? null : a.concept, lesson && a.code === lesson.code ? null : a.code, position, status])
  options.forEach((o, i) => tables.answer_options.push([o.newId, a.id, o.label, i + 1]))
  tables['private.solutions'].push([a.id, options.find(o => o.id === a.answerId).newId, a.explanation])
}
for (const [i, course] of courses.entries()) {
  tables.courses.push([course.id, course.name, course.description, course.category, course.visual.label, course.visual.caption, i + 1, 'published'])
  for (const [j, unit] of course.units.entries()) {
    const available = course.id !== 'javascript' || j === 0
    tables.units.push([unit.id, course.id, unit.title, unit.description, unit.icon || 'auto_stories', j + 1, available, 'published'])
    for (const [k, lesson] of unit.lessons.entries()) {
      const status = available ? 'published' : 'draft'
      tables.lessons.push([lesson.id, unit.id, lesson.title, lesson.description, { array: lesson.content }, lesson.code, k + 1, status])
      lesson.activities.forEach((a, n) => addQuestion(a, lesson, null, n + 1, status))
    }
  }
  intros.filter(a => a.courseId === course.id).forEach((a, n) => addQuestion(a, null, course, n + 1, 'published'))
}
const columns = {
  courses: 'id, name, description, category, visual_label, visual_caption, position, publication_status',
  units: 'id, course_id, title, description, icon, position, is_available, publication_status',
  lessons: 'id, unit_id, title, description, content, code, position, publication_status',
  questions: 'id, lesson_id, intro_course_id, title, prompt, concept, code, position, publication_status',
  answer_options: 'id, question_id, label, position',
  'private.solutions': 'question_id, correct_option_id, explanation'
}
const output = ['-- Generado con npm run db:seed:generate. Carga inicial, no sobrescribe ediciones del equipo.', 'begin;']
for (const [table, rows] of Object.entries(tables)) {
  const name = table.includes('.') ? table : 'public.' + table
  output.push(`\ninsert into ${name} (${columns[table]}) values\n` + rows.map(row =>
    '(' + row.map(value => value?.array ? array(value.array) : quote(value)).join(', ') + ')').join(',\n') +
    '\non conflict do nothing;')
}
output.push('\ncommit;\n')
await writeFile(new URL('../supabase/seed.sql', import.meta.url), output.join('\n'))
console.log(Object.fromEntries(Object.entries(tables).map(([name, rows]) => [name, rows.length])))
