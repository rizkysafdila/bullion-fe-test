<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'show'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <UButton label="Lihat" icon="lucide:eye" variant="link" @click="emit('show')" />
    <UButton label="Edit" icon="lucide:edit" variant="link" @click="emit('edit')" />
    <UButton label="Hapus" icon="lucide:trash-2" variant="link" @click="emit('delete')" />
  </div>
</template>
