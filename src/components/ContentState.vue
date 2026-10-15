<script setup>
defineProps({ loading: Boolean, error: { type: String, default: '' } })
defineEmits(['retry'])
</script>
<template>
  <div v-if="loading" class="content-state" role="status" aria-live="polite">
    <q-spinner color="primary" size="28px" aria-hidden="true" /> <p>Cargando contenidos…</p>
  </div>
  <div v-else-if="error" class="content-state" role="alert">
    <h2>No pudimos cargar los contenidos</h2><p>{{ error }}</p>
    <q-btn no-caps unelevated color="primary" label="Reintentar consulta" @click="$emit('retry')" />
  </div>
</template>
