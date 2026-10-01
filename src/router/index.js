import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomePage from '../pages/HomePage.vue'
import CoursesPage from '../pages/CoursesPage.vue'
import PracticePage from '../pages/PracticePage.vue'
import PlaceholderPage from '../pages/PlaceholderPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import LessonsPage from '../pages/LessonsPage.vue'
import UnitPage from '../pages/UnitPage.vue'
import LessonPage from '../pages/LessonPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import { findUnit, findLesson, getUnits } from '../services/contentRepository.js'
import { unitState, canOpenLesson } from '../domain/learning.js'
import { learningProgress } from '../stores/learningProgress.js'

const routes = [{
  path: '/', component: MainLayout,
  children: [
    { path: '', name: 'home', component: HomePage, meta: { title: 'Inicio' } },
    { path: 'cursos', name: 'courses', component: CoursesPage, meta: { title: 'Cursos y tutoriales' } },
    { path: 'cursos/:courseId', name: 'course', component: CoursePage, props: true, meta: { title: 'Recorrido del curso' } },
    { path: 'cursos/:courseId/unidades/:unitId', name: 'course-unit', component: UnitPage, props: true, meta: { title: 'Unidad del curso', learning: true } },
    { path: 'cursos/:courseId/unidades/:unitId/lecciones/:lessonId', name: 'course-lesson', component: LessonPage, props: true, meta: { title: 'Lección del curso', learning: true } },
    { path: 'cursos/:courseId/unidades/:unitId/lecciones/:lessonId/actividades', name: 'course-exercise', component: PracticePage,
      props: route => ({ courseId: route.params.courseId, unitId: route.params.unitId, lessonId: route.params.lessonId }), meta: { title: 'Ejercicios del curso', learning: true } },
    { path: 'cursos/:courseId/actividades', name: 'practice', component: PracticePage, props: true, meta: { title: 'Actividades introductorias' } },
    {
      path: 'lecciones', name: 'lessons', component: LessonsPage, meta: { title: 'Unidades y lecciones' }
    },
    {
      path: 'perfil', name: 'profile', component: ProfilePage, meta: { title: 'Perfil' }
    },
    {
      path: ':pathMatch(.*)*', name: 'not-found', component: PlaceholderPage, meta: { title: 'Página no encontrada' },
      props: { title: 'Este camino todavía no existe', description: 'La dirección no corresponde a una página de CodePath. Volvé al catálogo para seguir explorando.', notFound: true }
    }
  ]
}]

const router = createRouter({
  history: createWebHashHistory(), routes,
  scrollBehavior: (to, from, saved) => {
    const practice = r => ['practice', 'course-exercise'].includes(r.name)
    if (practice(to) || practice(from)) return false
    return saved || { top: 0 }
  }
})
// La protección también se aplica al pegar una URL o cambiar sus parámetros.
router.beforeEach(to => {
  if (!to.meta.learning) return
  const units = getUnits(to.params.courseId)
  const unit = findUnit(to.params.unitId, to.params.courseId)
  if (!unit) return
  const lesson = findLesson(to.params.unitId, to.params.lessonId, to.params.courseId)
  if (unitState(units, unit.id, learningProgress.value) === 'locked' ||
      (lesson && !canOpenLesson(units, unit.id, lesson.id, learningProgress.value))) {
    return { name: 'course', params: { courseId: to.params.courseId }, query: { bloqueada: '1' } }
  }
})
router.afterEach((to) => {
  document.title = (to.meta.title || 'Aprendé a programar') + ' | CodePath'
})
export default router
