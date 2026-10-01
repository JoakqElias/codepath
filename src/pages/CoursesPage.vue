<script setup>
import CourseCard from '../components/CourseCard.vue'
import { getCourses } from '../services/contentRepository.js'
import { activitiesForCourse } from '../services/contentRepository.js'
import { useRouter } from 'vue-router'
const courses = getCourses()

const router = useRouter()
function selectCourse ({ courseId, destination }) {
  const course = courses.find(item => item.id === courseId)
  if (!course) return
  if (destination === 'course' && course.status === 'available' && course.entryRoute) router.push(course.entryRoute)
  if (destination === 'practice' && activitiesForCourse(courseId).length) router.push({ name: 'practice', params: { courseId } })
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
        <div><strong>Las nueve tecnologías ya tienen lecciones y actividades.</strong><span> JavaScript ofrece diez lecciones y las otras tecnologías, dos lecciones iniciales cada una. Terminá para avanzar y repetí para llegar al 100 %.</span></div>
      </div>
      <div class="catalog-label"><h2>Todos los cursos y tutoriales</h2><span>{{ courses.length }} propuestas · Nivel inicial</span></div>
      <div class="course-grid"><CourseCard v-for="course in courses" :key="course.id" :course="course" :practice-count="activitiesForCourse(course.id).length" @seleccionar="selectCourse" /></div>
      <p class="catalog-footnote"><q-icon name="info_outline" size="18px" aria-hidden="true" /> Empezá desde cero: cada actividad incluye una explicación breve antes de responder.</p>
    </section>
  </q-page>
</template>
