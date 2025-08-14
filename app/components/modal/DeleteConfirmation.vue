<script lang="ts" setup>
defineProps<{
  title: string
  subtitle: string
  icon?: string
  iconClass?: string
  iconBgClass?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void | Promise<void>
  (e: 'close'): void
}>()
</script>

<template>
  <UModal :ui="{ content: 'max-w-sm' }">
    <template #content>
      <div class="p-6 space-y-4">
        <div
          v-if="icon"
          class="mx-auto flex justify-center items-center w-20 h-20 rounded-full"
          :class="iconBgClass"
        >
          <UIcon
            :name="icon"
            :size="32"
            :class="iconClass"
          />
        </div>

        <div class="space-y-1">
          <div class="text-center text-lg font-medium">
            {{ title }}
          </div>
          <div class="text-center text-sm text-gray-500">
            {{ subtitle }}
          </div>
        </div>
        <div class="w-full flex gap-2 justify-center">
          <UButton
            label="Batal"
            color="neutral"
            variant="outline"
            block
            @click="emit('close')"
          />
          <UButton
            label="Hapus"
            color="error"
            type="submit"
            :loading="loading"
            block
            @click="emit('submit')"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
