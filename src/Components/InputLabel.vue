<template>
    <label class="mt-2 tracking-wider uppercase text-sm font-black text-black">
      <span v-if="value">{{ value }}</span>
      <span v-else><slot /></span>
    </label>
  </template>
  
  <script setup>
  defineProps({
    value: {
      type: String,
    },
  });
  </script>
  
  <style scoped>
  .input-icon {
    width: 1.5rem; /* Adjust size as needed */
    height: 1.5rem;
  }
  </style>
  