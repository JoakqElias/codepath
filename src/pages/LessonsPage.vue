<script setup>
import { getCourses, getUnits } from '../services/contentRepository.js'
import { canOpenLesson } from '../domain/learning.js'
import { completedLessons, lessonScores } from '../stores/learningProgress.js'
const courses = getCourses().map(course => ({ ...course, units: getUnits(course.id) }))
</script>

<template>
  <q-page tabindex="-1" class="page-bg">
    <section class="container learning-container">
      <div class="learning-heading"><span class="eyebrow section-kicker">ELEGÍ TU PRÓXIMO PASO</span><h1>Unidades y lecciones</h1><p>Actividades en las nueve tecnologías. Terminá cada lección para avanzar y repetí para mejorar tu porcentaje.</p></div>
      <q-list bordered class="lessons-index">
        <q-expansion-item v-for="course in courses" :key="course.id" :label="course.name" :toggle-aria-label="'Lecciones de ' + course.name" icon="auto_stories" :caption="course.units.reduce((total, unit) => total + unit.lessons.length, 0) + ' lecciones · 4 actividades por lección'">
          <section v-for="unit in course.units" :key="unit.id" class="lessons-index-unit"><h2>{{ unit.title }}</h2>
            <div v-for="lesson in unit.lessons" :key="lesson.id" class="lessons-index-row">
              <q-btn flat no-caps color="primary" align="left" :label="lesson.title" :disable="!canOpenLesson(course.units, unit.id, lesson.id, completedLessons)"
                :to="canOpenLesson(course.units, unit.id, lesson.id, completedLessons) ? { name: 'course-lesson', params: { courseId: course.id, unitId: unit.id, lessonId: lesson.id } } : undefined" />
              <span>{{ Object.hasOwn(lessonScores, lesson.id) ? lessonScores[lesson.id] + ' % completo' : canOpenLesson(course.units, unit.id, lesson.id, completedLessons) ? 'Disponible' : 'Bloqueada' }}</span>
            </div>
          </section>
        </q-expansion-item>
      </q-list>
    </section>
  </q-page>
</template>
