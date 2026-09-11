import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomePage from '../pages/HomePage.vue'
import CoursesPage from '../pages/CoursesPage.vue'
import PracticePage from '../pages/PracticePage.vue'
import PlaceholderPage from '../pages/PlaceholderPage.vue'
import JavaScriptCoursePage from '../pages/JavaScriptCoursePage.vue'
import UnitPage from '../pages/UnitPage.vue'
import LessonPage from '../pages/LessonPage.vue'
import { javascriptUnits, findUnit, findLesson } from '../data/javascriptCourse.js'
import { unitState, canOpenLesson } from '../domain/learning.js'
import { learningProgress } from '../stores/learningProgress.js'

const routes = [{
  path: '/', component: MainLayout,
  children: [
    { path: '', name: 'home', component: HomePage, meta: { title: 'Inicio' } },
    { path: 'cursos', name: 'courses', component: CoursesPage, meta: { title: 'Cursos y tutoriales' } },
    { path: 'cursos/javascript', name: 'javascript-course', component: JavaScriptCoursePage, meta: { title: 'JavaScript desde cero' } },
    { path: 'cursos/javascript/unidades/:unitId', name: 'javascript-unit', component: UnitPage, props: true, meta: { title: 'Unidad de JavaScript', learning: true } },
    { path: 'cursos/javascript/unidades/:unitId/lecciones/:lessonId', name: 'javascript-lesson', component: LessonPage, props: true, meta: { title: 'Lección de JavaScript', learning: true } },
    { path: 'cursos/javascript/unidades/:unitId/lecciones/:lessonId/actividades', name: 'javascript-exercise', component: PracticePage,
      props: route => ({ courseId: 'javascript', unitId: route.params.unitId, lessonId: route.params.lessonId }), meta: { title: 'Ejercicios de JavaScript', learning: true } },
    { path: 'cursos/:courseId/actividades', name: 'practice', component: PracticePage, props: true, meta: { title: 'Actividades introductorias' } },
    {
      path: 'lecciones', name: 'lessons', component: PlaceholderPage, meta: { title: 'Unidades y lecciones' },
      props: { title: 'Unidades y lecciones', description: 'El índice de lecciones de todas las tecnologías está en desarrollo. Ya podés recorrer las cinco unidades de JavaScript o explorar las prácticas del catálogo.', courseLink: true }
    },
    {
      path: 'perfil', name: 'profile', component: PlaceholderPage, meta: { title: 'Perfil' },
      props: { title: 'Tu perfil, próximamente', description: 'En una próxima etapa vas a poder consultar tu historial y tus logros. Esta entrega no tiene cuentas ni guarda avances después de recargar.' }
    },
    {
      path: ':pathMatch(.*)*', name: 'not-found', component: PlaceholderPage, meta: { title: 'Página no encontrada' },
      props: { title: 'Este camino todavía no existe', description: 'La dirección no corresponde a una página de CodePath. Volvé al catálogo para seguir explorando.', notFound: true }
    }
  ]
}]

const router = createRouter({
  history: createWebHashHistory(), routes,
  scrollBehavior: () => ({ top: 0 })
})
// La protección también se aplica al pegar una URL o cambiar sus parámetros.
router.beforeEach(to => {
  if (!to.meta.learning) return
  const unit = findUnit(to.params.unitId)
  if (!unit) return
  const lesson = findLesson(to.params.unitId, to.params.lessonId)
  if (unitState(javascriptUnits, unit.id, learningProgress.value) === 'locked' ||
      (lesson && !canOpenLesson(javascriptUnits, unit.id, lesson.id, learningProgress.value))) {
    return { name: 'javascript-course', query: { bloqueada: '1' } }
  }
})
router.afterEach((to) => {
  document.title = (to.meta.title || 'Aprendé a programar') + ' | CodePath'
})
export default router
