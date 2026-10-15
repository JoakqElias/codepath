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
// Cada vista comprueba pertenencia y avance después de cargar; un fallo de red
// debe permitir reintentar en la misma pantalla, sin bloquear la navegación.
router.afterEach((to) => {
  document.title = (to.meta.title || 'Aprendé a programar') + ' | CodePath'
})
export default router
