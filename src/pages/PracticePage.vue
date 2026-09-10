<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { courses } from '../data/courses'
import { activitiesForCourse } from '../data/activities'
import { evaluateAnswer, summarizeAnswers } from '../domain/practice'
import PlaceholderPage from './PlaceholderPage.vue'

const props = defineProps({ courseId: { type: String, required: true } })
const course = computed(() => courses.find(item => item.id === props.courseId))
const activities = computed(() => activitiesForCourse(props.courseId))
const index = ref(0)
const selected = ref(null)
const answers = ref([])
const completed = ref(false)
const questionHeading = ref(null)
const resultHeading = ref(null)
const current = computed(() => activities.value[index.value])
const feedback = computed(() => answers.value[index.value] || null)
const summary = computed(() => summarizeAnswers(answers.value))
const options = computed(() => current.value?.options.map(option => ({ label: option.label, value: option.id })) || [])

function reset () {
  index.value = 0
  selected.value = null
  answers.value = []
  completed.value = false
}
watch(() => props.courseId, reset)

function check () {
  if (!current.value || selected.value === null || feedback.value) return
  answers.value.push(evaluateAnswer(current.value, selected.value))
}
async function advance () {
  if (!feedback.value) return
  if (index.value + 1 === activities.value.length) {
    completed.value = true
    await nextTick()
    resultHeading.value?.focus()
  } else {
    index.value++
    selected.value = null
    await nextTick()
    questionHeading.value?.focus()
  }
}
async function restart () {
  reset()
  await nextTick()
  questionHeading.value?.focus()
}
</script>

<template>
  <PlaceholderPage v-if="!course || !activities.length" title="Práctica no encontrada"
    description="No hay actividades para esta dirección. Elegí una tecnología desde el catálogo." not-found />
  <q-page v-else tabindex="-1" class="page-bg practice-page">
    <section class="container practice-container">
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Volver al catálogo" to="/cursos" class="back-link" />
      <div class="practice-heading"><span class="eyebrow section-kicker">PRÁCTICA INTRODUCTORIA</span><h1>{{ course.name }}</h1><p>Aprendé un concepto y ponelo a prueba. Esta práctica no se guarda; al salir o recargar se reinicia.</p></div>

      <q-card v-if="completed" flat bordered class="result-card">
        <span class="result-icon"><q-icon name="task_alt" size="44px" aria-hidden="true" /></span>
        <h2 ref="resultHeading" tabindex="-1">Resultados de esta práctica</h2>
        <p class="result-score">{{ summary.correct }} <span>de {{ activities.length }} respuestas correctas</span></p>
        <p>{{ summary.correct === activities.length ? '¡Buen comienzo! Aplicaste los conceptos de esta práctica.' : 'Cada intento ayuda a aprender. Revisá las explicaciones y volvé a practicar cuando quieras.' }}</p>
        <ul class="result-list"><li v-for="(answer, answerIndex) in answers" :key="answer.activityId">
          <q-icon :name="answer.isCorrect ? 'check_circle' : 'cancel'" :color="answer.isCorrect ? 'positive' : 'negative'" size="21px" aria-hidden="true" />
          <div><strong>{{ activities[answerIndex].title }} · {{ answer.isCorrect ? 'Correcta' : 'Incorrecta' }}</strong><p>{{ answer.explanation }}</p></div>
        </li></ul>
        <div class="practice-buttons"><q-btn unelevated no-caps color="primary" icon="replay" label="Volver a practicar" @click="restart" /><q-btn outline no-caps color="primary" label="Explorar otra tecnología" to="/cursos" /></div>
        <p class="session-note">Resultado temporal. Todavía no hay cuentas, logros ni historial de progreso.</p>
      </q-card>

      <template v-else>
        <div class="practice-counter"><span>Actividad {{ index + 1 }} de {{ activities.length }}</span><span>{{ answers.length }} respondidas</span></div>
        <q-linear-progress :value="answers.length / activities.length" color="primary" track-color="grey-3" rounded size="6px" :aria-label="answers.length + ' de ' + activities.length + ' actividades respondidas'" />
        <q-card flat bordered class="exercise-card">
          <h2 ref="questionHeading" tabindex="-1">{{ current.title }}</h2>
          <div class="concept-box"><span class="eyebrow"><q-icon name="lightbulb_outline" size="18px" aria-hidden="true" /> ANTES DE EMPEZAR</span><p>{{ current.concept }}</p></div>
          <pre class="exercise-code"><code>{{ current.code }}</code></pre>
          <form @submit.prevent="check">
            <fieldset :disabled="Boolean(feedback)" class="answer-fieldset">
              <legend>{{ current.question }}</legend>
              <q-option-group :key="current.id" v-model="selected" :options="options" type="radio" color="primary" :disable="Boolean(feedback)" class="answer-options" :name="current.id" />
            </fieldset>
            <div class="feedback-region" aria-live="polite" aria-atomic="true">
              <div v-if="feedback" class="answer-feedback" :class="feedback.isCorrect ? 'answer-feedback--correct' : 'answer-feedback--incorrect'">
                <q-icon :name="feedback.isCorrect ? 'check_circle' : 'cancel'" size="25px" aria-hidden="true" />
                <div><strong>{{ feedback.isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta. Veamos por qué.' }}</strong>
                  <p v-if="!feedback.isCorrect">Respuesta correcta: {{ current.options.find(option => option.id === current.answerId).label }}</p>
                  <p>{{ feedback.explanation }}</p>
                </div>
              </div>
            </div>
            <div class="practice-buttons">
              <q-btn v-if="!feedback" type="submit" unelevated no-caps color="primary" label="Comprobar respuesta" :disable="selected === null" />
              <q-btn v-else type="button" unelevated no-caps color="primary" :label="index + 1 === activities.length ? 'Ver resultados' : 'Siguiente actividad'" icon-right="arrow_forward" @click="advance" />
              <span v-if="!feedback" class="session-note">Elegí una opción para comprobar.</span>
            </div>
          </form>
        </q-card>
        <p class="session-note practice-disclaimer"><q-icon name="info_outline" size="18px" aria-hidden="true" /> Los ejemplos son ilustrativos: esta práctica no ejecuta código ni reemplaza al curso completo.</p>
      </template>
    </section>
  </q-page>
</template>
