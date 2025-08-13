<script lang="ts" setup>
defineProps<{
  label?: string
  value?: string
  colSpan?: number
}>()
</script>

<template>
  <div
    class="space-y-1"
    :class="{ 'col-span-2': colSpan === 2 }"
  >
    <p class="font-bold">
      {{ label }}
    </p>
    <p>{{ value }}</p>
  </div>
</template>
