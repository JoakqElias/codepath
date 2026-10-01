// Única frontera de lectura de los datos de prueba. Sin estado del participante.
// Una futura implementación remota deberá agregar async/carga/error en los consumidores.
import { courses as sourceCourses } from '../data/courses.js'
import { activitiesForCourse as introActivities } from '../data/activities.js'

export const getCourses = () => sourceCourses.filter(course => course.publicationStatus === 'published')
export const getCourse = id => getCourses().find(course => course.id === id)
export const getUnits = (courseId = 'javascript') => getCourse(courseId)?.units
  .filter(unit => unit.publicationStatus === 'published')
  .map(unit => ({ ...unit, lessons: unit.lessons.filter(lesson => lesson.publicationStatus === 'published')
    .map(lesson => ({ ...lesson, activities: lesson.activities.filter(activity => activity.publicationStatus === 'published') })) })) || []
export const findUnit = (id, courseId = 'javascript') => getUnits(courseId).find(unit => unit.id === id)
export const getLessons = (unitId, courseId = 'javascript') => findUnit(unitId, courseId)?.lessons.filter(lesson => lesson.publicationStatus === 'published') || []
export const findLesson = (unitId, lessonId, courseId = 'javascript') => getLessons(unitId, courseId).find(lesson => lesson.id === lessonId)
export const getActivities = (unitId, lessonId, courseId = 'javascript') => findLesson(unitId, lessonId, courseId)?.activities.filter(activity => activity.publicationStatus === 'published') || []
export const activitiesForCourse = courseId => getCourse(courseId) ? introActivities(courseId) : []
