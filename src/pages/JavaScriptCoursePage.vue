<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UnitCard from '../components/UnitCard.vue'
import { javascriptUnits, javascriptLessons } from '../data/javascriptCourse.js'
import { unitState } from '../domain/learning.js'
import { learningProgress } from '../stores/learningProgress.js'

const router = useRouter()
const route = useRoute()
const completed = computed(() => javascriptLessons.filter(lesson => learningProgress.value.includes(lesson.id)).length)
function openUnit (unitId) {
  if (unitState(javascriptUnits, unitId, learningProgress.value) !== 'locked') router.push({ name: 'javascript-unit', params: { unitId } })
}
</script>

<template>
  <q-page tabindex="-1" class="page-bg">
    <section class="container learning-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Cursos y tutoriales" to="/cursos" class="back-link" />
      <div class="learning-heading"><span class="eyebrow section-kicker">TU PRIMER RECORRIDO</span><h1>JavaScript desde cero</h1><p>Variables, decisiones, repeticiones y funciones. Aprendé un concepto por vez y aplicalo antes de seguir.</p></div>
      <div class="course-summary"><div><strong>{{ javascriptUnits.length }} unidades · {{ javascriptLessons.length }} lecciones</strong><p>{{ completed }} de {{ javascriptLessons.length }} lecciones completadas</p></div><span class="course-summary-mark" aria-hidden="true">JS</span></div>
      <div class="scope-notice learning-notice" role="note"><q-icon name="info_outline" size="23px" aria-hidden="true" /><div>Aprobá las dos actividades de cada lección para avanzar. Las unidades se habilitan en orden. Tu avance se mantiene al navegar por esta aplicación, pero se reinicia al recargar o cerrar la pestaña.</div></div>
      <p v-if="route.query.bloqueada" class="locked-notice" role="status"><q-icon name="lock_outline" aria-hidden="true" /> Ese contenido está bloqueado. Completá primero las lecciones anteriores.</p>
      <div v-if="completed === javascriptLessons.length" class="course-finished" role="status"><q-icon name="check_circle" size="28px" aria-hidden="true" /><div><h2>¡Completaste el recorrido inicial!</h2><p>Aprobaste las diez lecciones. Podés volver a cualquier unidad para repasar.</p></div></div>
      <div class="units-list"><UnitCard v-for="(unit, index) in javascriptUnits" :key="unit.id" :unit="unit" :number="index + 1"
        :status="unitState(javascriptUnits, unit.id, learningProgress)" :completed-lessons="unit.lessons.filter(lesson => learningProgress.includes(lesson.id)).length" @seleccionar="openUnit" /></div>
    </section>
  </q-page>
</template>
