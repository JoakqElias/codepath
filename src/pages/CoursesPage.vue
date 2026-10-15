<script setup>
import CourseCard from '../components/CourseCard.vue'
import { getCourses } from '../services/contentRepository.js'
import { computed } from 'vue'
import { useContent } from '../composables/useContent.js'
import ContentState from '../components/ContentState.vue'
import { useRouter } from 'vue-router'
const { data, loading, error, retry } = useContent(() => [], getCourses)
const courses = computed(() => data.value || [])

const router = useRouter()
function selectCourse ({ courseId, destination }) {
  const course = courses.value.find(item => item.id === courseId)
  if (!course) return
  if (destination === 'course' && course.status === 'available' && course.entryRoute) router.push(course.entryRoute)
  if (destination === 'practice') router.push({ name: 'practice', params: { courseId } })
}
</script>

<template>
  <q-page tabindex="-1" class="page-bg">
    <section class="container catalog-section">
      <div class="page-heading">
        <span class="eyebrow section-kicker">EXPLORÁ NUEVOS CAMINOS</span>
        <h1>Cursos y tutoriales</h1>
        <p class="lead">De tu primera página a tus primeras líneas de código.<br class="desktop-break" /> Encontrá el tema con el que te gustaría empezar.</p>
      </div>
      <div class="scope-notice" role="note">
        <q-icon name="construction" size="25px" aria-hidden="true" />
        <div><strong>Contenidos publicados por el equipo.</strong><span> Las unidades en preparación se identifican como no disponibles. Terminá cada lección publicada para avanzar.</span></div>
      </div>
      <div class="catalog-label"><h2>Todos los cursos y tutoriales</h2><span>{{ courses.length }} propuestas · Nivel inicial</span></div>
      <ContentState :loading="loading" :error="error" @retry="retry" />
      <template v-if="!loading && !error">
        <p v-if="!courses.length" role="status">No hay cursos disponibles en este momento.</p>
        <div v-else class="course-grid"><CourseCard v-for="course in courses" :key="course.id" :course="course" @seleccionar="selectCourse" /></div>
        <q-btn flat no-caps color="primary" label="Volver a consultar" @click="retry" />
      </template>
      <p class="catalog-footnote"><q-icon name="info_outline" size="18px" aria-hidden="true" /> Empezá desde cero: cada actividad incluye una explicación breve antes de responder.</p>
    </section>
  </q-page>
</template>
