<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { getCourseTree } from '../services/contentRepository.js'
import { useContent } from '../composables/useContent.js'
import ContentState from '../components/ContentState.vue'
import { unitState } from '../domain/learning.js'
import { canOpenLesson } from '../domain/learning.js'
import { learningProgress, lessonScores } from '../stores/learningProgress.js'
import PlaceholderPage from './PlaceholderPage.vue'
const props = defineProps({ courseId: { type: String, default: 'javascript' }, unitId: { type: String, required: true } })
const { data, loading, error, retry } = useContent(() => [props.courseId, props.unitId], () => getCourseTree(props.courseId))
const units = computed(() => data.value?.units || [])
const unit = computed(() => units.value.find(item => item.id === props.unitId))
const course = computed(() => data.value?.course)
const router = useRouter()
watch(data, () => {
  if (unit.value && unitState(units.value, unit.value.id, learningProgress.value) === 'locked') {
    router.replace({ name: 'course', params: { courseId: props.courseId }, query: { bloqueada: '1' } })
  }
})
</script>

<template>
  <q-page v-if="loading || error" class="page-bg"><section class="container learning-container"><ContentState :loading="loading" :error="error" @retry="retry" /></section></q-page>
  <PlaceholderPage v-else-if="!unit" title="Unidad no encontrada" description="Esta unidad no forma parte del curso indicado." not-found />
  <q-page v-else tabindex="-1" class="page-bg">
    <section class="container learning-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Volver a las unidades" :to="{ name: 'course', params: { courseId } }" class="back-link" />
      <div class="learning-heading"><span class="eyebrow section-kicker">{{ course.name }} · UNIDAD {{ units.findIndex(item => item.id === unit.id) + 1 }}</span><h1>{{ unit.title }}</h1><p>{{ unit.description }}</p></div>
      <p v-if="!unit.lessons.length" role="status">Esta unidad todavía no tiene lecciones publicadas. No disponible.</p>
      <p v-else class="section-intro">Terminá todas las actividades para habilitar la siguiente lección. Guardamos tu mejor porcentaje y podés repetir para llegar al 100 %.</p>
      <div class="lesson-list">
        <q-card v-for="(lesson, index) in unit.lessons" :key="lesson.id" tag="article" flat bordered class="lesson-card" :aria-labelledby="'lesson-' + lesson.id">
          <span class="eyebrow">LECCIÓN {{ index + 1 }} · {{ lesson.activityCount }} ACTIVIDADES</span><h2 :id="'lesson-' + lesson.id">{{ lesson.title }}</h2><p>{{ lesson.description }}</p>
          <p class="lesson-state"><q-icon :name="learningProgress.includes(lesson.id) ? 'check_circle' : canOpenLesson(units, unit.id, lesson.id, learningProgress) ? 'play_circle_outline' : 'lock_outline'" aria-hidden="true" /> {{ Object.hasOwn(lessonScores, lesson.id) ? lessonScores[lesson.id] + ' % completo · Mejor resultado' : learningProgress.includes(lesson.id) ? 'Terminada · Repetí para registrar tu porcentaje' : canOpenLesson(units, unit.id, lesson.id, learningProgress) ? 'Disponible' : 'Bloqueada: terminá la lección anterior' }}</p>
          <q-linear-progress class="q-mb-md" rounded size="8px" :value="(lessonScores[lesson.id] || 0) / 100" :color="lessonScores[lesson.id] === 100 ? 'positive' : 'primary'" track-color="grey-3" :aria-label="(lessonScores[lesson.id] || 0) + ' % de aciertos en el mejor intento'" />
          <q-btn unelevated no-caps color="primary" :disable="!canOpenLesson(units, unit.id, lesson.id, learningProgress)"
            :to="canOpenLesson(units, unit.id, lesson.id, learningProgress) ? { name: 'course-lesson', params: { courseId, unitId: unit.id, lessonId: lesson.id } } : undefined"
            :label="learningProgress.includes(lesson.id) ? 'Repasar lección' : 'Abrir lección'" :aria-label="'Abrir lección: ' + lesson.title" icon-right="arrow_forward" />
        </q-card>
      </div>
      <q-btn flat no-caps color="primary" label="Volver a consultar" @click="retry" />
    </section>
  </q-page>
</template>
