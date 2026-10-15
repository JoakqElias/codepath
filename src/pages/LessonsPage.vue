<script setup>
import { computed } from 'vue'
import { getCourses, getCourseTree } from '../services/contentRepository.js'
import { useContent } from '../composables/useContent.js'
import ContentState from '../components/ContentState.vue'
import { canOpenLesson } from '../domain/learning.js'
import { completedLessons, lessonScores } from '../stores/learningProgress.js'
const { data, loading, error, retry } = useContent(() => [], async () => {
  const courses = await getCourses()
  return Promise.all(courses.map(async course => ({ ...course, units: (await getCourseTree(course.id)).units })))
})
const courses = computed(() => data.value || [])
</script>

<template>
  <q-page tabindex="-1" class="page-bg">
    <section class="container learning-container">
      <div class="learning-heading"><span class="eyebrow section-kicker">ELEGÍ TU PRÓXIMO PASO</span><h1>Unidades y lecciones</h1><p>Terminá cada lección publicada para avanzar y repetí para mejorar tu porcentaje.</p></div>
      <ContentState :loading="loading" :error="error" @retry="retry" />
      <p v-if="!loading && !error && !courses.length" role="status">No hay cursos disponibles en este momento.</p>
      <q-list v-if="!loading && !error && courses.length" bordered class="lessons-index">
        <q-expansion-item v-for="course in courses" :key="course.id" :label="course.name" :toggle-aria-label="'Lecciones de ' + course.name" icon="auto_stories" :caption="course.units.reduce((total, unit) => total + unit.lessons.length, 0) + ' lecciones publicadas'">
          <section v-for="unit in course.units" :key="unit.id" class="lessons-index-unit"><h2>{{ unit.title }}</h2>
            <p v-if="!unit.lessons.length">No disponible: todavía no hay lecciones publicadas.</p>
            <div v-for="lesson in unit.lessons" :key="lesson.id" class="lessons-index-row">
              <q-btn flat no-caps color="primary" align="left" :label="lesson.title" :disable="!canOpenLesson(course.units, unit.id, lesson.id, completedLessons)"
                :to="canOpenLesson(course.units, unit.id, lesson.id, completedLessons) ? { name: 'course-lesson', params: { courseId: course.id, unitId: unit.id, lessonId: lesson.id } } : undefined" />
              <span>{{ Object.hasOwn(lessonScores, lesson.id) ? lessonScores[lesson.id] + ' % completo' : canOpenLesson(course.units, unit.id, lesson.id, completedLessons) ? 'Disponible' : 'Bloqueada' }}</span>
            </div>
          </section>
        </q-expansion-item>
      </q-list>
      <q-btn v-if="!loading && !error" flat no-caps color="primary" label="Volver a consultar" @click="retry" />
    </section>
  </q-page>
</template>
