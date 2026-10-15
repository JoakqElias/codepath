import { getSupabase } from './supabase.js'

// Única frontera de datos. Sin fallback local ni caché persistente de contenido.
export function createContentRepository (getClient = getSupabase) {
  async function read (request) {
    const { data, error } = await request
    if (error) throw new Error('No pudimos consultar los contenidos. Revisá tu conexión y reintentá.', { cause: error })
    return data
  }
  const mapCourse = c => c && ({ ...c, visual: { label: c.visual_label, caption: c.visual_caption },
    publicationStatus: c.publication_status, status: 'available', entryRoute: '/cursos/' + c.id })
  const mapUnit = u => ({ ...u, courseId: u.course_id, publicationStatus: u.publication_status,
    isAvailable: u.is_available, lessons: [] })
  const mapLesson = l => ({ ...l, unitId: l.unit_id, publicationStatus: l.publication_status,
    activityCount: l.questions?.[0]?.count || 0 })
  const mapQuestion = q => ({ ...q, lessonId: q.lesson_id, title: q.title ?? q.prompt, question: q.prompt,
    publicationStatus: q.publication_status, type: 'single-choice' })
  const published = table => getClient().from(table).select('*').eq('publication_status', 'published')
  const api = {
    async getCourses () { return (await read(published('courses').order('position'))).map(mapCourse) },
    async getCourse (id) { return mapCourse(await read(published('courses').eq('id', id).maybeSingle())) },
    async getUnits (courseId) { return (await read(published('units').eq('course_id', courseId).order('position'))).map(mapUnit) },
    async getLessons (unitId) {
      return (await read(getClient().from('lessons').select('*, questions(count)')
        .eq('publication_status', 'published').eq('unit_id', unitId).order('position'))).map(mapLesson)
    },
    async getQuestions (lessonId) {
      return (await read(published('questions').eq('lesson_id', lessonId).order('position'))).map(mapQuestion)
    },
    async getOptions (questionId) {
      return read(getClient().from('answer_options').select('id, question_id, label, position')
        .eq('question_id', questionId).order('position'))
    },
    async getCourseTree (courseId) {
      const course = await api.getCourse(courseId)
      if (!course) return { course: null, units: [] }
      const units = await api.getUnits(courseId)
      await Promise.all(units.map(async unit => { unit.lessons = unit.isAvailable ? await api.getLessons(unit.id) : [] }))
      return { course, units }
    },
    async getLessonContent (courseId, unitId, lessonId) {
      const tree = await api.getCourseTree(courseId)
      const unit = tree.units.find(item => item.id === unitId)
      const lesson = unit?.lessons.find(item => item.id === lessonId)
      if (!lesson) return { ...tree, unit, lesson: null, activities: [] }
      const questions = await api.getQuestions(lesson.id)
      const activities = await Promise.all(questions.map(async q => ({ ...q,
        concept: q.concept ?? lesson.content.join(' '), code: q.code ?? lesson.code,
        options: await api.getOptions(q.id) })))
      lesson.activities = activities
      return { ...tree, unit, lesson, activities }
    },
    async getIntroContent (courseId) {
      const course = await api.getCourse(courseId)
      if (!course) return { course: null, units: [], activities: [] }
      const questions = (await read(published('questions').eq('intro_course_id', courseId).order('position'))).map(mapQuestion)
      const activities = await Promise.all(questions.map(async q => ({ ...q, options: await api.getOptions(q.id) })))
      return { course, units: [], activities }
    },
    async checkAnswer (questionId, optionId) {
      const rows = await read(getClient().rpc('check_practice_answer', { p_question_id: questionId, p_option_id: optionId }))
      const result = rows?.[0]
      if (typeof result?.is_correct !== 'boolean' || typeof result?.explanation !== 'string') {
        throw new Error('No se pudo comprobar la respuesta. Reintentá; todavía no se contabilizó.')
      }
      return { activityId: questionId, answerId: optionId, isCorrect: result.is_correct, explanation: result.explanation }
    }
  }
  return api
}
export const contentRepository = createContentRepository()
export const { getCourses, getCourse, getUnits, getLessons, getQuestions, getOptions,
  getCourseTree, getLessonContent, getIntroContent, checkAnswer } = contentRepository
