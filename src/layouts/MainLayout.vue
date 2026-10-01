<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '../components/BrandLogo.vue'
import PracticePage from '../pages/PracticePage.vue'
import { userProfile, userStats } from '../stores/userProfile.js'

const route = useRoute()
const router = useRouter()
const isPractice = computed(() => ['practice', 'course-exercise'].includes(route.name))
const backgroundRoute = computed(() => isPractice.value ? router.resolve(route.name === 'course-exercise'
  ? { name: 'course-lesson', params: { courseId: route.params.courseId, unitId: route.params.unitId, lessonId: route.params.lessonId } }
  : { name: 'courses' }) : route)
const practice = ref(null)
let returnFocus = null
let returnPath = ''
let returnTrigger = ''
watch(isPractice, open => {
  if (open) {
    returnFocus = document.activeElement
    returnPath = backgroundRoute.value.fullPath
    returnTrigger = route.params.lessonId || route.params.courseId
  }
}, { immediate: true, flush: 'sync' })
function restoreFocus () {
  const trigger = route.fullPath === returnPath ? [...document.querySelectorAll('[data-practice-trigger]')]
    .find(el => el.dataset.practiceTrigger === returnTrigger) : null
  const target = trigger || (returnFocus?.isConnected && returnFocus.tabIndex >= 0 && !returnFocus.closest('[inert]') ? returnFocus : mainContent.value?.querySelector('main'))
  target?.focus({ preventScroll: true })
}
function containTab (event) {
  const items = [...event.currentTarget.querySelectorAll('a[href], button, input, summary, [tabindex]')]
    .filter(el => el.tabIndex >= 0 && !el.matches(':disabled') && el.getClientRects().length)
  const first = items[0]; const last = items[items.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
const practiceParams = computed(() => ({ courseId: route.params.courseId,
  unitId: route.params.unitId || '', lessonId: route.params.lessonId || '' }))
function closePractice () { router.push(backgroundRoute.value.fullPath) }
const menuOpen = ref(false)
const mainContent = ref(null)
const menuButton = ref(null)
const navigation = [
  { label: 'Inicio', path: '/', icon: 'home' },
  { label: 'Cursos y tutoriales', path: '/cursos', icon: 'auto_stories' },
  { label: 'Lecciones', path: '/lecciones', icon: 'school' },
  { label: 'Perfil', path: '/perfil', icon: 'person_outline' }
]
const isCurrent = (path) => path === '/' ? route.path === '/' : route.path.startsWith(path)
function closeMenu () {
  menuOpen.value = false
  menuButton.value?.$el.focus()
}
watch(() => route.fullPath, async (to, from) => {
  menuOpen.value = false
  if (isPractice.value || from?.endsWith('/actividades')) return
  await nextTick()
  mainContent.value?.querySelector('main')?.focus({ preventScroll: true })
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <a href="#main-content" class="skip-link" :inert="isPractice || undefined" @click.prevent="mainContent?.querySelector('main')?.focus()">Saltar al contenido</a>
    <q-header class="header" :inert="isPractice || undefined">
      <q-toolbar class="container header-toolbar">
        <router-link to="/" class="brand-link" aria-label="CodePath, inicio"><BrandLogo /></router-link>
        <nav class="desktop-nav" aria-label="Navegación principal">
          <q-btn v-for="item in navigation" :key="item.path" flat no-caps :label="item.label" :to="item.path"
            :class="{ 'nav-active': isCurrent(item.path) }" :aria-current="isCurrent(item.path) ? 'page' : undefined" />
        </nav>
        <router-link to="/perfil" class="header-user" :aria-label="userProfile.name + ', nivel ' + userStats.level + ', ver perfil'"><q-icon :name="userProfile.avatar" /><span>Nv. {{ userStats.level }}</span></router-link>
        <q-btn ref="menuButton" class="mobile-menu-toggle" flat no-caps :icon="menuOpen ? 'close' : 'menu'" :label="menuOpen ? 'Cerrar' : 'Menú'"
          :aria-expanded="menuOpen" aria-controls="mobile-navigation" @click="menuOpen = !menuOpen" />
      </q-toolbar>
      <nav v-show="menuOpen" id="mobile-navigation" class="mobile-nav container" aria-label="Navegación móvil" @keydown.esc="closeMenu">
        <q-btn v-for="item in navigation" :key="item.path" flat no-caps align="left" :label="item.label" :icon="item.icon" :to="item.path"
          :class="{ 'nav-active': isCurrent(item.path) }" :aria-current="isCurrent(item.path) ? 'page' : undefined" @click="closeMenu" />
      </nav>
    </q-header>
    <q-page-container><div id="main-content" ref="mainContent" :inert="isPractice || undefined" :aria-hidden="isPractice || undefined"><router-view :route="backgroundRoute" /></div>
      <footer class="site-footer" :inert="isPractice || undefined"><div class="container footer-content"><router-link to="/" class="brand-link" aria-label="CodePath, inicio"><BrandLogo /></router-link><p>Un nuevo camino empieza con curiosidad.</p><span class="footer-status">Segunda entrega · Recorrido funcional</span></div></footer>
    </q-page-container>
    <q-dialog :model-value="isPractice" persistent no-shake no-refocus backdrop-filter="blur(8px)" class="practice-dialog" aria-label="Actividad de CodePath" :aria-hidden="!isPractice || undefined" @hide="restoreFocus">
      <div class="practice-modal" @keydown.esc.stop.prevent="practice?.requestClose()" @keydown.tab="containTab">
        <PracticePage v-if="isPractice" ref="practice" :key="route.fullPath" v-bind="practiceParams" @close="closePractice" />
      </div>
    </q-dialog>
  </q-layout>
</template>
