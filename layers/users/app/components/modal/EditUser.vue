<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { IDetailedUser } from '../../types/user'
import z from 'zod'

const props = defineProps<{
  data: IDetailedUser
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: Partial<IDetailedUser>): void
}>()

const schema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  email: z.email(),
  phone: z.string().regex(
    /^(?:\+62|62|0)8\d{7,11}$/,
    'Invalid phone number. Use format +628xxxxxxxx or 08xxxxxxxx',
  ),
  address: z.string().min(1, 'Address is required'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  first_name: props.data?.first_name ?? '',
  last_name: props.data?.last_name ?? '',
  gender: props.data?.gender ?? '',
  date_of_birth: formatDateInput(props.data?.date_of_birth) ?? '',
  email: props.data?.email ?? '',
  phone: props.data?.phone ?? '',
  address: props.data?.address ?? '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data)
}
</script>

<template>
  <UModal
    title="Edit User"
    :ui="{
      content: 'max-w-md',
      title: 'text-lg font-bold',
      header: 'justify-between border-b-0',
      body: 'border-b-0',
    }"
  >
    <template #close>
      <UButton icon="mdi:close" size="sm" class="rounded-full" />
    </template>

    <template #body>
      <UForm
        :state="state"
        :schema="schema"
        class="space-y-6"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="Nama Depan" name="first_name">
            <UInput
              v-model="state.first_name"
              type="text"
              name="first_name"
              placeholder="Masukkan nama depan"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Nama Belakang" name="last_name">
            <UInput
              v-model="state.last_name"
              type="text"
              name="last_name"
              placeholder="Masukkan nama belakang"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Jenis Kelamin" name="gender">
            <USelect
              v-model="state.gender"
              name="gender"
              placeholder="Pilih jenis kelamin"
              size="lg"
              :items="genderItems"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Tanggal Lahir" name="date_of_birth">
            <UInput
              v-model="state.date_of_birth"
              name="date_of_birth"
              type="date"
              placeholder="Pilih tanggal lahir"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Email" name="email" class="md:col-span-2">
            <UInput
              v-model="state.email"
              type="email"
              name="email"
              placeholder="Masukkan email"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="No. Handphone" name="phone" class="md:col-span-2">
            <UInput
              v-model="state.phone"
              type="tel"
              name="phone"
              placeholder="Masukkan no handphone"
              size="lg"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Alamat" name="address" class="md:col-span-2">
            <UInput
              v-model="state.address"
              type="text"
              name="address"
              placeholder="Masukkan alamat"
              size="lg"
              class="w-full"
            />
          </UFormField>
        </div>
        <UButton
          type="submit"
          label="Simpan"
          size="lg"
          :loading="loading"
          block
        />
      </UForm>
    </template>
  </UModal>
</template>
