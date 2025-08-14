<script lang="ts" setup>
defineProps<{
  title: string
  addButton?: boolean
}>()
</script>

<template>
  <div class="px-9 py-8 bg-white mb-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">
        {{ title }}
      </h1>
      <UButton
        v-if="addButton"
        label="Tambah User"
        to="/register"
        size="lg"
        class="px-8"
      />
    </div>
  </div>
</template>
