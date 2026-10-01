<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UnitCard from '../components/UnitCard.vue'
import { getUnits, getCourse } from '../services/contentRepository.js'
import { unitState, averageScore } from '../domain/learning.js'
import { learningProgress, lessonScores } from '../stores/learningProgress.js'
import PlaceholderPage from './PlaceholderPage.vue'
const props = defineProps({ courseId: { type: String, default: 'javascript' } })
const course = computed(() => getCourse(props.courseId))
const units = computed(() => getUnits(props.courseId))
const lessons = computed(() => units.value.flatMap(unit => unit.lessons))
const mastery = computed(() => averageScore(lessons.value, lessonScores.value))

const router = useRouter()
const route = useRoute()
const completed = computed(() => lessons.value.filter(lesson => learningProgress.value.includes(lesson.id)).length)
function openUnit (unitId) {
  if (unitState(units.value, unitId, learningProgress.value) !== 'locked') router.push({ name: 'course-unit', params: { courseId: props.courseId, unitId } })
}
</script>

<template>
  <PlaceholderPage v-if="!course" title="Curso no encontrado" description="Esta tecnología no forma parte del catálogo." not-found />
  <q-page v-else tabindex="-1" class="page-bg">
    <section class="container learning-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Cursos y tutoriales" to="/cursos" class="back-link" />
      <div class="learning-heading"><span class="eyebrow section-kicker">TU PRIMER RECORRIDO</span><h1>{{ course.id === 'javascript' ? 'JavaScript desde cero' : course.name + ' desde cero' }}</h1><p>{{ course.description }}</p></div>
      <div class="course-summary"><div><strong>{{ units.length }} unidades · {{ lessons.length }} lecciones</strong><p>{{ completed }} de {{ lessons.length }} lecciones terminadas</p><p>{{ mastery }} % de aciertos · Promedio de tus mejores resultados</p></div><span class="course-summary-mark" aria-hidden="true">{{ course.visual.label }}</span></div>
      <div class="scope-notice learning-notice" role="note"><q-icon name="info_outline" size="23px" aria-hidden="true" /><div>Respondé todas las actividades para seguir a la próxima lección, aunque tengas errores. Guardamos tu mejor porcentaje: podés volver a practicar hasta llegar al 100 %.</div></div>
      <p v-if="route.query.bloqueada" class="locked-notice" role="status"><q-icon name="lock_outline" aria-hidden="true" /> Ese contenido está bloqueado. Completá primero las lecciones anteriores.</p>
      <div v-if="completed === lessons.length" class="course-finished" role="status"><q-icon name="check_circle" size="28px" aria-hidden="true" /><div><h2>¡Terminaste el recorrido inicial!</h2><p>Recorriste todas las lecciones. Podés repetirlas para mejorar tus porcentajes y llegar al 100 %.</p></div></div>
      <div class="units-list"><UnitCard v-for="(unit, index) in units" :key="unit.id" :unit="unit" :number="index + 1"
        :status="unitState(units, unit.id, learningProgress)" :completed-lessons="unit.lessons.filter(lesson => learningProgress.includes(lesson.id)).length" :mastery="averageScore(unit.lessons, lessonScores)" @seleccionar="openUnit" /></div>
    </section>
  </q-page>
</template>
