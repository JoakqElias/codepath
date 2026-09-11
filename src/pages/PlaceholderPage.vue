<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: 'Esta vista está preparada para una próxima etapa.' },
  notFound: Boolean,
  courseLink: Boolean
})
</script>

<template>
  <q-page tabindex="-1" class="page-bg placeholder-page">
    <section class="placeholder-card">
      <span class="placeholder-icon"><q-icon :name="notFound ? 'explore_off' : 'construction'" size="44px" aria-hidden="true" /></span>
      <span class="eyebrow">{{ notFound ? 'ERROR 404' : 'EN DESARROLLO' }}</span>
      <h1>{{ title }}</h1>
      <p class="lead">{{ description }}</p>
      <p v-if="!notFound" class="placeholder-note">Por ahora podés explorar los nueve cursos y tutoriales y probar sus actividades introductorias.</p>
      <q-btn color="primary" unelevated no-caps label="Explorar el catálogo" icon-right="arrow_forward" to="/cursos" />
      <q-btn v-if="courseLink" outline no-caps color="primary" label="Ir a las unidades de JavaScript" to="/cursos/javascript" class="q-mt-md" />
    </section>
  </q-page>
</template>
