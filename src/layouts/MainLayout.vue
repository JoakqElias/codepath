<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from '../components/BrandLogo.vue'

const route = useRoute()
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
watch(() => route.fullPath, async () => {
  menuOpen.value = false
  await nextTick()
  mainContent.value?.querySelector('main')?.focus({ preventScroll: true })
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <a href="#main-content" class="skip-link" @click.prevent="mainContent?.querySelector('main')?.focus()">Saltar al contenido</a>
    <q-header class="header">
      <q-toolbar class="container header-toolbar">
        <router-link to="/" class="brand-link" aria-label="CodePath, inicio"><BrandLogo /></router-link>
        <nav class="desktop-nav" aria-label="Navegación principal">
          <q-btn v-for="item in navigation" :key="item.path" flat no-caps :label="item.label" :to="item.path"
            :class="{ 'nav-active': isCurrent(item.path) }" :aria-current="isCurrent(item.path) ? 'page' : undefined" />
        </nav>
        <q-btn ref="menuButton" class="mobile-menu-toggle" flat no-caps :icon="menuOpen ? 'close' : 'menu'" :label="menuOpen ? 'Cerrar' : 'Menú'"
          :aria-expanded="menuOpen" aria-controls="mobile-navigation" @click="menuOpen = !menuOpen" />
      </q-toolbar>
      <nav v-show="menuOpen" id="mobile-navigation" class="mobile-nav container" aria-label="Navegación móvil" @keydown.esc="closeMenu">
        <q-btn v-for="item in navigation" :key="item.path" flat no-caps align="left" :label="item.label" :icon="item.icon" :to="item.path"
          :class="{ 'nav-active': isCurrent(item.path) }" :aria-current="isCurrent(item.path) ? 'page' : undefined" @click="closeMenu" />
      </nav>
    </q-header>
    <q-page-container><div id="main-content" ref="mainContent"><router-view /></div>
      <footer class="site-footer"><div class="container footer-content"><router-link to="/" class="brand-link" aria-label="CodePath, inicio"><BrandLogo /></router-link><p>Un nuevo camino empieza con curiosidad.</p><span class="footer-status">Primera entrega · En construcción</span></div></footer>
    </q-page-container>
  </q-layout>
</template>
