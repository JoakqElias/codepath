<script setup>
import { computed } from 'vue'
import { findLesson, findUnit } from '../data/javascriptCourse.js'
import PlaceholderPage from './PlaceholderPage.vue'
const props = defineProps({ unitId: { type: String, required: true }, lessonId: { type: String, required: true } })
const unit = computed(() => findUnit(props.unitId))
const lesson = computed(() => findLesson(props.unitId, props.lessonId))
</script>

<template>
  <PlaceholderPage v-if="!lesson" title="Lección no encontrada" description="Esta lección no pertenece a la unidad indicada." not-found />
  <q-page v-else tabindex="-1" class="page-bg">
    <section class="container practice-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Volver a la unidad" :to="{ name: 'javascript-unit', params: { unitId } }" class="back-link" />
      <div class="learning-heading"><span class="eyebrow section-kicker">{{ unit.title }}</span><h1>{{ lesson.title }}</h1><p>{{ lesson.description }}</p></div>
      <q-card flat bordered class="lesson-reading"><h2>Un concepto a la vez</h2><p v-for="paragraph in lesson.content" :key="paragraph">{{ paragraph }}</p><pre class="exercise-code"><code>{{ lesson.code }}</code></pre>
        <div class="scope-notice"><q-icon name="lightbulb_outline" size="23px" aria-hidden="true" /><p>Ahora vas a resolver dos actividades. Podés releer la explicación durante la práctica. Si te equivocás, revisá la devolución y volvé a intentar.</p></div>
        <q-btn unelevated no-caps color="primary" label="Resolver actividades" icon-right="arrow_forward" :to="{ name: 'javascript-exercise', params: { unitId, lessonId } }" class="q-mt-lg" />
      </q-card>
    </section>
  </q-page>
</template>
