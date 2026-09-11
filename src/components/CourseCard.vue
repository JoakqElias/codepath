<script setup>
import { computed } from 'vue'
const props = defineProps({ course: { type: Object, required: true }, practiceCount: { type: Number, default: 0 } })
const emit = defineEmits(['seleccionar'])
const available = computed(() => props.course.status === 'available' && props.course.units.length > 0 && Boolean(props.course.entryRoute))
const select = destination => emit('seleccionar', { courseId: props.course.id, destination })
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
      <span class="course-status"><q-icon :name="available ? 'check_circle' : 'schedule'" size="17px" aria-hidden="true" /> {{ available ? 'Curso inicial disponible · ' + course.units.length + ' unidades' : 'Curso completo: Próximamente' }}</span>
      <span v-if="practiceCount" class="practice-status"><q-icon name="task_alt" size="17px" aria-hidden="true" /> {{ practiceCount }} actividades introductorias disponibles</span>
    </q-card-section>
    <q-card-actions class="course-actions">
      <q-btn v-if="available" unelevated no-caps class="full-width" color="primary" label="Ver unidades" icon-right="arrow_forward"
        :aria-label="'Ver unidades de ' + course.name" @click="select('course')" />
      <q-btn v-if="practiceCount" :outline="available" :unelevated="!available" no-caps class="full-width" color="primary"
        @click="select('practice')" label="Probar actividades" icon-right="arrow_forward"
        :aria-label="'Probar actividades de ' + course.name" />
      <q-btn v-if="!available" flat no-caps disable class="full-width course-access" color="primary" icon="lock_outline"
        label="Curso completo · Próximamente" :aria-label="'Curso completo de ' + course.name + ': Próximamente'" />
    </q-card-actions>
  </q-card>
</template>
