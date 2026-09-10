<script setup>
import { computed } from 'vue'
import { activitiesForCourse } from '../data/activities'

const props = defineProps({ course: { type: Object, required: true } })
const activityCount = computed(() => activitiesForCourse(props.course.id).length)
const visualLabel = computed(() => props.course.visual?.label || props.course.name.slice(0, 3))
</script>

<template>
  <q-card tag="article" flat bordered class="course-card" :aria-labelledby="'course-' + course.id">
    <div class="course-art" :class="'course-art--' + course.id" aria-hidden="true">
      <span class="art-bracket">&lt;</span><span class="technology-mark">{{ visualLabel }}</span><span class="art-bracket">/&gt;</span>
      <span class="art-caption">{{ course.visual?.caption || course.name }}</span>
    </div>
    <q-card-section class="course-content">
      <span class="eyebrow">{{ course.category }}</span>
      <h2 :id="'course-' + course.id">{{ course.name }}</h2>
      <p>{{ course.description }}</p>
      <span class="course-status"><q-icon name="schedule" size="17px" aria-hidden="true" /> Curso completo: Próximamente</span>
      <span v-if="activityCount" class="practice-status"><q-icon name="task_alt" size="17px" aria-hidden="true" /> {{ activityCount }} actividades introductorias disponibles</span>
    </q-card-section>
    <q-card-actions class="course-actions">
      <q-btn v-if="activityCount" unelevated no-caps class="full-width" color="primary"
        :to="'/cursos/' + course.id + '/actividades'" label="Probar actividades" icon-right="arrow_forward"
        :aria-label="'Probar actividades de ' + course.name" />
      <q-btn flat no-caps disable class="full-width course-access" color="primary" icon="lock_outline"
        label="Curso completo · Próximamente" :aria-label="'Curso completo de ' + course.name + ': Próximamente'" />
    </q-card-actions>
  </q-card>
</template>
