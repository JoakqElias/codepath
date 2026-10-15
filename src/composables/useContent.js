import { onScopeDispose, ref, watch } from 'vue'

// Descarta respuestas antiguas al cambiar de ruta durante una consulta.
export function useContent (parameters, query) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref('')
  let generation = 0
  async function retry () {
    const current = ++generation
    loading.value = true
    error.value = ''
    data.value = null
    try {
      const value = await query()
      if (current === generation) data.value = value
    } catch (cause) {
      if (current === generation) error.value = cause.message || 'No pudimos cargar los contenidos. Reintentá.'
    } finally {
      if (current === generation) loading.value = false
    }
  }
  watch(parameters, retry, { immediate: true })
  onScopeDispose(() => { generation++ })
  return { data, loading, error, retry }
}
