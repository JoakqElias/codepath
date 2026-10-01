<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getCourses } from '../services/contentRepository.js'
import { activitiesForCourse } from '../services/contentRepository.js'
import { evaluateAnswer, summarizeAnswers } from '../domain/practice'
import { findLesson, getUnits, getActivities } from '../services/contentRepository.js'
import { completeLesson, lessonScores } from '../stores/learningProgress.js'
import { canSaveProfile, userStats, startAttempt, recordAnswer, endAttempt } from '../stores/userProfile.js'
const courses = getCourses()

const props = defineProps({ courseId: { type: String, required: true }, unitId: { type: String, default: '' }, lessonId: { type: String, default: '' } })
const emit = defineEmits(['close'])
const attemptId = ref(null)
const confirmExit = ref(false)
const closeButton = ref(null)
const exitHeading = ref(null)
async function requestClose () {
  if (answers.value.length && !completed.value) {
    confirmExit.value = true
    await nextTick()
    exitHeading.value?.focus()
  } else emit('close')
}
async function keepPracticing () {
  confirmExit.value = false
  await nextTick()
  closeButton.value?.$el.focus()
}
defineExpose({ requestClose })
onMounted(() => closeButton.value?.$el.focus())
onBeforeUnmount(() => { if (attemptId.value) endAttempt(attemptId.value, true) })
const isLesson = computed(() => Boolean(props.unitId || props.lessonId))
const lesson = computed(() => findLesson(props.unitId, props.lessonId, props.courseId))
const course = computed(() => courses.find(item => item.id === props.courseId))
const activities = computed(() => isLesson.value ? getActivities(props.unitId, props.lessonId, props.courseId) : activitiesForCourse(props.courseId))
const index = ref(0)
const selected = ref(null)
const answers = ref([])
const completed = ref(false)
const questionHeading = ref(null)
const resultHeading = ref(null)
const feedbackPanel = ref(null)
const current = computed(() => activities.value[index.value])
const feedback = computed(() => answers.value[index.value] || null)
const summary = computed(() => summarizeAnswers(answers.value))
const options = computed(() => current.value?.options.map(option => ({ label: option.label, value: option.id })) || [])
const passed = computed(() => activities.value.length > 0 && summary.value.correct === activities.value.length)
const nextLesson = computed(() => {
  if (!isLesson.value || !completed.value) return null
  const sequence = getUnits(props.courseId).flatMap(unit => unit.lessons.map(item => ({ courseId: props.courseId, unitId: unit.id, lessonId: item.id })))
  const next = sequence[sequence.findIndex(item => item.lessonId === props.lessonId) + 1]
  return next ? { name: 'course-lesson', params: next } : null
})

function reset () {
  if (attemptId.value) endAttempt(attemptId.value, true)
  attemptId.value = null
  index.value = 0
  selected.value = null
  answers.value = []
  completed.value = false
}
watch(() => [props.courseId, props.unitId, props.lessonId], reset)

async function check () {
  if (!current.value || selected.value === null || feedback.value) return
  const answer = evaluateAnswer(current.value, selected.value)
  if (!attemptId.value) attemptId.value = startAttempt({ courseId: props.courseId,
    title: isLesson.value ? lesson.value.title : course.value.name, total: activities.value.length })
  recordAnswer(attemptId.value, answer)
  answers.value.push(answer)
  await nextTick()
  feedbackPanel.value?.focus()
}
async function advance () {
  if (!feedback.value || completed.value) return
  if (index.value + 1 === activities.value.length) {
    if (isLesson.value) completeLesson(props.unitId, props.lessonId, answers.value, props.courseId)
    endAttempt(attemptId.value)
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
  <div class="practice-modal-toolbar"><span><q-icon name="code" /> Espacio de práctica</span><q-btn ref="closeButton" flat round icon="close" aria-label="Cerrar actividad" @click="requestClose" /></div>
  <section v-if="confirmExit" class="practice-exit" role="alert" aria-labelledby="exit-title"><h2 id="exit-title" ref="exitHeading" tabindex="-1">¿Dejar esta práctica?</h2><p>Las respuestas realizadas y los XP se conservan. La práctica quedará interrumpida y tu racha volverá a cero.</p><div class="practice-buttons"><q-btn unelevated color="primary" no-caps label="Seguir practicando" @click="keepPracticing" /><q-btn outline color="primary" no-caps label="Salir de la práctica" @click="emit('close')" /></div></section>
  <section v-else-if="!course || !activities.length" class="practice-exit"><h1 id="practice-title">Práctica no encontrada</h1><p>No hay actividades para esta dirección. Elegí una tecnología desde el catálogo.</p><q-btn unelevated no-caps color="primary" label="Explorar el catálogo" to="/cursos" class="q-mt-lg" /></section>
  <div v-else class="practice-page">
    <section class="container practice-container">
      <div class="practice-heading"><h1 id="practice-title">{{ isLesson ? lesson.title : course.name }}</h1><p v-if="isLesson">Terminá para avanzar. Repetí para llegar al 100 %.</p></div>
      <div class="practice-live-stats" aria-live="polite"><span><q-icon name="insights" /> Habilidad: {{ userStats.skill === null ? 'sin datos' : userStats.skill + '%' }}</span><span><q-icon name="local_fire_department" /> Racha: {{ userStats.streak }}</span><span>Nivel {{ userStats.level }} · {{ userStats.xp }} XP</span></div>

      <q-card v-if="completed" flat bordered class="result-card">
        <h2 ref="resultHeading" tabindex="-1">Resultados de esta práctica</h2>
        <p class="result-score">{{ summary.correct }} <span>de {{ activities.length }} respuestas correctas</span></p>
        <dl class="result-metrics" aria-label="Resumen del intento"><div><dt>Actividades</dt><dd>{{ activities.length }}</dd></div><div><dt>Correctas</dt><dd>{{ summary.correct }}</dd></div><div><dt>Incorrectas</dt><dd>{{ summary.incorrect }}</dd></div><div><dt>Aciertos</dt><dd>{{ Math.round(summary.correct / activities.length * 1000) / 10 }} %</dd></div></dl>
        <p class="session-note">Estos resultados corresponden solamente a este intento. No forman parte de un ranking compartido.</p>
        <p v-if="isLesson" class="lesson-best-score">{{ lessonScores[lessonId] }} % completo · Tu mejor resultado</p>
        <p v-if="isLesson" class="lesson-result-message" role="status">{{ passed ? '¡100 % completo! Respondiste todo correctamente.' : 'Lección terminada. Podés seguir y volver a intentar cuando quieras mejorar.' }}</p>
        <p class="lesson-result-message" role="status">{{ summary.correct / activities.length > 0.4 ? '¡Sumaste una práctica a tu racha!' : 'Esta práctica reinició tu racha. Podés empezar otra.' }} +{{ summary.correct * 10 }} XP · Racha actual: {{ userStats.streak }}</p>

        <div class="practice-buttons">
          <q-btn v-if="nextLesson" unelevated no-caps color="primary" label="Siguiente lección" icon-right="arrow_forward" :to="nextLesson" />
          <q-btn v-if="isLesson" outline no-caps color="primary" label="Volver a la unidad" :to="{ name: 'course-unit', params: { courseId, unitId } }" />
          <q-btn v-if="isLesson" :unelevated="!nextLesson" :outline="Boolean(nextLesson)" no-caps color="primary" :label="!nextLesson ? 'Ver recorrido completado' : 'Ver mis unidades'" :to="{ name: 'course', params: { courseId } }" />
          <q-btn :unelevated="!isLesson" :outline="isLesson" no-caps color="primary" icon="replay" label="Volver a practicar" @click="restart" />
          <q-btn v-if="!isLesson" outline no-caps color="primary" label="Explorar otra tecnología" to="/cursos" />
        </div>
        <q-btn flat no-caps color="primary" label="Ver mi perfil" to="/perfil" class="q-mt-md" />
        <p class="session-note">{{ canSaveProfile ? 'Tu resultado y tu progreso se guardaron en este navegador.' : 'No se pudo guardar en este navegador. El resultado se conserva solo durante esta sesión.' }}</p>

        <details class="result-review"><summary>Revisar respuestas y explicaciones</summary><ul class="result-list"><li v-for="(answer, answerIndex) in answers" :key="answer.activityId">
          <q-icon :name="answer.isCorrect ? 'check_circle' : 'cancel'" :color="answer.isCorrect ? 'positive' : 'negative'" size="21px" aria-hidden="true" />
          <div><strong>{{ activities[answerIndex].title }} · {{ answer.isCorrect ? 'Correcta' : 'Incorrecta' }}</strong><p>{{ answer.explanation }}</p></div>
        </li></ul></details>
      </q-card>

      <template v-else>
        <div class="practice-counter"><span>Actividad {{ index + 1 }} de {{ activities.length }}</span><span>{{ answers.length }} respondidas</span></div>
        <q-linear-progress :value="answers.length / activities.length" color="primary" track-color="grey-3" rounded size="6px" :aria-label="answers.length + ' de ' + activities.length + ' actividades respondidas'" />
        <q-card flat bordered class="exercise-card">
          <h2 id="activity-question" ref="questionHeading" tabindex="-1">{{ current.question }}</h2>
          <div class="exercise-reference">
            <details :key="current.id" class="concept-box" :open="!isLesson"><summary><q-icon name="lightbulb_outline" aria-hidden="true" /> {{ isLesson ? 'Repasar el concepto' : 'Antes de responder' }}</summary><p>{{ current.concept }}</p></details>
            <pre class="exercise-code"><code>{{ current.code }}</code></pre>
          </div>
          <form id="practice-answer-form" @submit.prevent="check">
            <fieldset :disabled="Boolean(feedback)" class="answer-fieldset" aria-labelledby="activity-question">
              <legend class="sr-only">Elegí una respuesta para la actividad</legend>
              <q-option-group :key="current.id" v-model="selected" :options="options" type="radio" color="primary" :disable="Boolean(feedback)" class="answer-options" :name="current.id" />
            </fieldset>
            <div class="feedback-region" aria-live="polite" aria-atomic="true">
              <div v-if="feedback" ref="feedbackPanel" tabindex="-1" class="answer-feedback" :class="feedback.isCorrect ? 'answer-feedback--correct' : 'answer-feedback--incorrect'">
                <q-icon :name="feedback.isCorrect ? 'check_circle' : 'cancel'" size="25px" aria-hidden="true" />
                <div><strong>{{ feedback.isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta. Veamos por qué.' }}</strong>
                  <p v-if="!feedback.isCorrect">Respuesta correcta: {{ current.options.find(option => option.id === current.answerId).label }}</p>
                  <p>{{ feedback.explanation }}</p>
                </div>
              </div>
            </div>
          </form>
        </q-card>
        <p class="session-note practice-disclaimer"><q-icon name="info_outline" size="18px" aria-hidden="true" /> {{ isLesson ? 'Los ejemplos se muestran como texto. Las actividades comprueban tus respuestas, sin ejecutar código.' : 'Los ejemplos son ilustrativos: esta práctica no ejecuta código ni reemplaza al curso completo.' }}</p>
      </template>
    </section>
  </div>
  <div v-if="course && activities.length && !completed && !confirmExit" class="practice-actionbar">
    <span class="session-note">{{ feedback ? 'Leé la devolución y continuá.' : selected === null ? 'Elegí una opción para comprobar.' : 'Tu respuesta está lista para comprobar.' }}</span>
    <q-btn v-if="!feedback" form="practice-answer-form" type="submit" unelevated no-caps color="primary" label="Comprobar respuesta" :disable="selected === null" />
    <q-btn v-else type="button" unelevated no-caps color="primary" :label="index + 1 === activities.length ? 'Ver resultados' : 'Siguiente actividad'" icon-right="arrow_forward" @click="advance" />
  </div>
</template>
