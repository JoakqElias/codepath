<script setup>
import CourseCard from '../components/CourseCard.vue'
import { courses } from '../data/courses'
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
        <div><strong>Los cursos completos están en preparación.</strong><span> Mientras tanto, podés probar tres actividades introductorias de cada tecnología con corrección inmediata. El progreso no se guarda.</span></div>
      </div>
      <div class="catalog-label"><h2>Todos los cursos y tutoriales</h2><span>{{ courses.length }} propuestas · Nivel inicial</span></div>
      <div class="course-grid"><CourseCard v-for="course in courses" :key="course.id" :course="course" /></div>
      <p class="catalog-footnote"><q-icon name="info_outline" size="18px" aria-hidden="true" /> Empezá desde cero: cada actividad incluye una explicación breve antes de responder.</p>
    </section>
  </q-page>
</template>
