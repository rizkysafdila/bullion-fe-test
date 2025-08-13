<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'show'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <UButton label="Lihat" icon="tabler:eye" variant="link" @click="emit('show')" />
    <UButton label="Edit" icon="tabler:edit" variant="link" @click="emit('edit')" />
    <UButton label="Hapus" icon="tabler:trash" variant="link" @click="emit('delete')" />
  </div>
</template>
