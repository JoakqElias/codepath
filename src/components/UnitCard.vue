<script setup>
import { computed } from 'vue'
const props = defineProps({
  unit: { type: Object, required: true }, number: { type: Number, required: true },
  status: { type: String, required: true, validator: value => ['available', 'locked', 'completed'].includes(value) },
  completedLessons: { type: Number, default: 0 }
})
const emit = defineEmits(['seleccionar'])
const states = { available: { label: 'Disponible', icon: 'play_circle_outline' }, locked: { label: 'Bloqueada', icon: 'lock_outline' }, completed: { label: 'Completada', icon: 'check_circle' } }
const state = computed(() => states[props.status])
</script>

<template>
  <q-card tag="article" flat bordered class="unit-card" :class="'unit-card--' + status" :aria-labelledby="'unit-' + unit.id">
    <div class="unit-symbol" aria-hidden="true"><q-icon :name="unit.icon || 'auto_stories'" size="28px" /></div>
    <div class="unit-card-content">
      <div class="unit-topline"><span class="eyebrow">UNIDAD {{ number }}</span><span class="unit-state"><q-icon :name="state.icon" size="19px" aria-hidden="true" /> {{ state.label }}</span></div>
      <h2 :id="'unit-' + unit.id">{{ unit.title }}</h2><p>{{ unit.description }}</p>
      <p class="unit-count">{{ completedLessons }} de {{ unit.lessons.length }} lecciones completadas</p>
      <q-linear-progress rounded size="7px" :value="unit.lessons.length ? completedLessons / unit.lessons.length : 0" :color="status === 'completed' ? 'positive' : 'primary'" track-color="grey-3" :aria-label="completedLessons + ' de ' + unit.lessons.length + ' lecciones completadas'" />
      <p v-if="status === 'locked'" class="unit-lock-note">Completá la unidad anterior para continuar.</p>
    </div>
    <q-btn no-caps unelevated color="primary" :disable="status === 'locked'" :icon="state.icon"
      :label="status === 'locked' ? 'Bloqueada' : status === 'completed' ? 'Repasar unidad' : 'Ver lecciones'"
      :aria-label="(status === 'locked' ? 'Bloqueada: ' : 'Abrir unidad: ') + unit.title" @click="emit('seleccionar', unit.id)" />
  </q-card>
</template>
