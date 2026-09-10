import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomePage from '../pages/HomePage.vue'
import CoursesPage from '../pages/CoursesPage.vue'
import PracticePage from '../pages/PracticePage.vue'
import PlaceholderPage from '../pages/PlaceholderPage.vue'

const routes = [{
  path: '/', component: MainLayout,
  children: [
    { path: '', name: 'home', component: HomePage, meta: { title: 'Inicio' } },
    { path: 'cursos', name: 'courses', component: CoursesPage, meta: { title: 'Cursos y tutoriales' } },
    { path: 'cursos/:courseId/actividades', name: 'practice', component: PracticePage, props: true, meta: { title: 'Actividades introductorias' } },
    {
      path: 'lecciones', name: 'lessons', component: PlaceholderPage, meta: { title: 'Unidades y lecciones' },
      props: { title: 'Unidades y lecciones', description: 'Estamos preparando los cursos completos con unidades y lecciones progresivas. Mientras tanto, las prácticas introductorias ya están disponibles desde el catálogo.' }
    },
    {
      path: 'perfil', name: 'profile', component: PlaceholderPage, meta: { title: 'Perfil' },
      props: { title: 'Tu perfil, próximamente', description: 'En una próxima etapa vas a poder consultar tu progreso y tus logros. Esta entrega no tiene cuentas ni guarda avances.' }
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
router.afterEach((to) => {
  document.title = (to.meta.title || 'Aprendé a programar') + ' | CodePath'
})
export default router
