<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getLessonContent } from '../services/contentRepository.js'
import { useContent } from '../composables/useContent.js'
import ContentState from '../components/ContentState.vue'
import { canOpenLesson } from '../domain/learning.js'
import { learningProgress } from '../stores/learningProgress.js'
import PlaceholderPage from './PlaceholderPage.vue'
const props = defineProps({ courseId: { type: String, default: 'javascript' }, unitId: { type: String, required: true }, lessonId: { type: String, required: true } })
const { data, loading, error, retry } = useContent(() => [props.courseId, props.unitId, props.lessonId],
  () => getLessonContent(props.courseId, props.unitId, props.lessonId))
const unit = computed(() => data.value?.unit)
const lesson = computed(() => data.value?.lesson)
const router = useRouter()
watch(data, value => {
  if (value?.lesson && !canOpenLesson(value.units, props.unitId, props.lessonId, learningProgress.value)) {
    router.replace({ name: 'course', params: { courseId: props.courseId }, query: { bloqueada: '1' } })
  }
})
</script>

<template>
  <q-page v-if="loading || error" class="page-bg"><section class="container learning-container"><ContentState :loading="loading" :error="error" @retry="retry" /></section></q-page>
  <PlaceholderPage v-else-if="!lesson" title="Lección no encontrada" description="Esta lección no está publicada o no pertenece a la unidad indicada." not-found />
  <q-page v-else tabindex="-1" class="page-bg">
    <section class="container practice-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Volver a la unidad" :to="{ name: 'course-unit', params: { courseId, unitId } }" class="back-link" />
      <div class="learning-heading"><span class="eyebrow section-kicker">{{ unit.title }}</span><h1>{{ lesson.title }}</h1><p>{{ lesson.description }}</p></div>
      <q-card flat bordered class="lesson-reading"><h2>Un concepto a la vez</h2><p v-for="paragraph in lesson.content" :key="paragraph">{{ paragraph }}</p><pre class="exercise-code"><code>{{ lesson.code }}</code></pre>
        <div class="scope-notice"><q-icon name="lightbulb_outline" size="23px" aria-hidden="true" /><p>Ahora vas a resolver {{ data.activities.length }} actividades. Podés releer la explicación durante la práctica. Al terminar podés seguir.</p></div>
        <p v-if="!data.activities.length" role="status">Esta lección todavía no tiene preguntas publicadas.</p>
        <q-btn v-else :data-practice-trigger="lessonId" unelevated no-caps color="primary" label="Resolver actividades" icon-right="arrow_forward" :to="{ name: 'course-exercise', params: { courseId, unitId, lessonId } }" class="q-mt-lg" />
      </q-card>
      <q-btn flat no-caps color="primary" label="Volver a consultar" @click="retry" />
    </section>
  </q-page>
</template>
