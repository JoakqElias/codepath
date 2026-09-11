<script setup>
import { computed } from 'vue'
import { findUnit, javascriptUnits } from '../data/javascriptCourse.js'
import { canOpenLesson } from '../domain/learning.js'
import { learningProgress } from '../stores/learningProgress.js'
import PlaceholderPage from './PlaceholderPage.vue'
const props = defineProps({ unitId: { type: String, required: true } })
const unit = computed(() => findUnit(props.unitId))
</script>

<template>
  <PlaceholderPage v-if="!unit" title="Unidad no encontrada" description="Esta unidad no forma parte del recorrido de JavaScript." not-found />
  <q-page v-else tabindex="-1" class="page-bg">
    <section class="container learning-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Volver a las unidades" :to="{ name: 'javascript-course' }" class="back-link" />
      <div class="learning-heading"><span class="eyebrow section-kicker">JAVASCRIPT · UNIDAD {{ javascriptUnits.findIndex(item => item.id === unit.id) + 1 }}</span><h1>{{ unit.title }}</h1><p>{{ unit.description }}</p></div>
      <p class="section-intro">Leé la explicación y respondé las dos actividades de cada lección. Para aprobar necesitás ambas respuestas correctas; podés reintentar.</p>
      <div class="lesson-list">
        <q-card v-for="(lesson, index) in unit.lessons" :key="lesson.id" tag="article" flat bordered class="lesson-card" :aria-labelledby="'lesson-' + lesson.id">
          <span class="eyebrow">LECCIÓN {{ index + 1 }} · 2 ACTIVIDADES</span><h2 :id="'lesson-' + lesson.id">{{ lesson.title }}</h2><p>{{ lesson.description }}</p>
          <p class="lesson-state"><q-icon :name="learningProgress.includes(lesson.id) ? 'check_circle' : canOpenLesson(javascriptUnits, unit.id, lesson.id, learningProgress) ? 'play_circle_outline' : 'lock_outline'" aria-hidden="true" /> {{ learningProgress.includes(lesson.id) ? 'Completada' : canOpenLesson(javascriptUnits, unit.id, lesson.id, learningProgress) ? 'Disponible' : 'Bloqueada: completá la lección anterior' }}</p>
          <q-btn unelevated no-caps color="primary" :disable="!canOpenLesson(javascriptUnits, unit.id, lesson.id, learningProgress)"
            :to="canOpenLesson(javascriptUnits, unit.id, lesson.id, learningProgress) ? { name: 'javascript-lesson', params: { unitId: unit.id, lessonId: lesson.id } } : undefined"
            :label="learningProgress.includes(lesson.id) ? 'Repasar lección' : 'Abrir lección'" :aria-label="'Abrir lección: ' + lesson.title" icon-right="arrow_forward" />
        </q-card>
      </div>
    </section>
  </q-page>
</template>
