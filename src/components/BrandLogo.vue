<script setup>
defineProps({ symbolOnly: Boolean })
</script>

<template>
  <span class="brand-logo">
    <svg class="brand-symbol" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#5B4BDB" />
      <path d="m17 17-7 7 7 7m14-14 7 7-7 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m27 14-6 20" stroke="#FFC857" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span v-if="!symbolOnly" class="brand-wordmark">CodePath</span>
    <span v-else class="sr-only">CodePath</span>
  </span>
</template>
