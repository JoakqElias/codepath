<script setup>
import { computed } from 'vue'
import { findUnit, getUnits, getCourse } from '../services/contentRepository.js'
import { canOpenLesson } from '../domain/learning.js'
import { learningProgress, lessonScores } from '../stores/learningProgress.js'
import PlaceholderPage from './PlaceholderPage.vue'
const props = defineProps({ courseId: { type: String, default: 'javascript' }, unitId: { type: String, required: true } })
const unit = computed(() => findUnit(props.unitId, props.courseId))
const units = computed(() => getUnits(props.courseId))
const course = computed(() => getCourse(props.courseId))
</script>

<template>
  <PlaceholderPage v-if="!unit" title="Unidad no encontrada" description="Esta unidad no forma parte del curso indicado." not-found />
  <q-page v-else tabindex="-1" class="page-bg">
    <section class="container learning-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Volver a las unidades" :to="{ name: 'course', params: { courseId } }" class="back-link" />
      <div class="learning-heading"><span class="eyebrow section-kicker">{{ course.name }} · UNIDAD {{ units.findIndex(item => item.id === unit.id) + 1 }}</span><h1>{{ unit.title }}</h1><p>{{ unit.description }}</p></div>
      <p class="section-intro">Terminá las cuatro actividades para habilitar la siguiente lección. Los errores no te frenan: guardamos tu mejor porcentaje y podés repetir para llegar al 100 %.</p>
      <div class="lesson-list">
        <q-card v-for="(lesson, index) in unit.lessons" :key="lesson.id" tag="article" flat bordered class="lesson-card" :aria-labelledby="'lesson-' + lesson.id">
          <span class="eyebrow">LECCIÓN {{ index + 1 }} · {{ lesson.activities.length }} ACTIVIDADES</span><h2 :id="'lesson-' + lesson.id">{{ lesson.title }}</h2><p>{{ lesson.description }}</p>
          <p class="lesson-state"><q-icon :name="learningProgress.includes(lesson.id) ? 'check_circle' : canOpenLesson(units, unit.id, lesson.id, learningProgress) ? 'play_circle_outline' : 'lock_outline'" aria-hidden="true" /> {{ Object.hasOwn(lessonScores, lesson.id) ? lessonScores[lesson.id] + ' % completo · Mejor resultado' : learningProgress.includes(lesson.id) ? 'Terminada · Repetí para registrar tu porcentaje' : canOpenLesson(units, unit.id, lesson.id, learningProgress) ? 'Disponible' : 'Bloqueada: terminá la lección anterior' }}</p>
          <q-linear-progress class="q-mb-md" rounded size="8px" :value="(lessonScores[lesson.id] || 0) / 100" :color="lessonScores[lesson.id] === 100 ? 'positive' : 'primary'" track-color="grey-3" :aria-label="(lessonScores[lesson.id] || 0) + ' % de aciertos en el mejor intento'" />
          <q-btn unelevated no-caps color="primary" :disable="!canOpenLesson(units, unit.id, lesson.id, learningProgress)"
            :to="canOpenLesson(units, unit.id, lesson.id, learningProgress) ? { name: 'course-lesson', params: { courseId, unitId: unit.id, lessonId: lesson.id } } : undefined"
            :label="learningProgress.includes(lesson.id) ? 'Repasar lección' : 'Abrir lección'" :aria-label="'Abrir lección: ' + lesson.title" icon-right="arrow_forward" />
        </q-card>
      </div>
    </section>
  </q-page>
</template>
