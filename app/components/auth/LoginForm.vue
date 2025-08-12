<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: Schema): void
}>()

const schema = z.object({
  email: z.email(),
  password: z.string().min(8, { error: 'Password too short' }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
  password: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const data = {
    ...event.data,
    password: await hashPassword(event.data.password),
  }
  emit('submit', data)
}
</script>

<template>
  <div class="w-full max-w-xs">
    <h1 class="font-bold text-3xl mb-10">
      Login Admin
    </h1>
    <UForm :state="state" :schema="schema" class="space-y-6" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput
          v-model="state.email"
          type="email"
          name="email"
          placeholder="Masukkan email"
          size="lg"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          name="password"
          placeholder="Masukkan password"
          size="lg"
          class="w-full"
        />
      </UFormField>
      <UButton
        type="submit"
        label="Masuk"
        size="lg"
        :loading="loading"
        block
      />
    </UForm>
  </div>
</template>
