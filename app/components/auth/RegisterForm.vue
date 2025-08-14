<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import type { IDetailedUser } from '~~/layers/users/app/types/user'
import * as z from 'zod'

const props = withDefaults(defineProps<{
  loading?: boolean
  data?: IDetailedUser
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning' | 'neutral'
}>(), {
  color: 'primary',
})

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
}>()

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg']

const schema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  email: z.email(),
  phone: z.string().min(1, 'No. handphone is required').max(15, 'Maximum 15 characters'),
  address: z.string().min(1, 'Address is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),

  password_confirm: z.string().min(1, 'Password confirmation is required'),
  photo: z
    .instanceof(File, { error: 'Please select an image file.' })
    .refine(file => file.size <= MAX_FILE_SIZE, {
      error: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: 'Please upload a valid image file (JPEG or JPG).',
    }),
}).refine(data => data.password === data.password_confirm, {
  message: 'Passwords do not match',
  path: ['password_confirm'],
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  first_name: props.data?.first_name ?? '',
  last_name: props.data?.last_name ?? '',
  gender: props.data?.gender ?? '',
  date_of_birth: props.data?.date_of_birth ?? '',
  email: props.data?.email ?? '',
  phone: props.data?.phone ?? '',
  address: props.data?.address ?? '',
  // photo: props.data?.photo ?? undefined,
  // password: props.data ?? '',
  // password_confirm: props.data ?? '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(event.data)) {
    if (key === 'password') {
      formData.append(key, await hashPassword(value as string))
    }
    else {
      formData.append(key, value as any)
    }
  }

  emit('submit', formData)
}
</script>

<template>
  <div class="w-full max-w-[405px]">
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
            :color="color"
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
            :color="color"
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
            :color="color"
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
            :color="color"
            size="lg"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Email" name="email" class="md:col-span-2">
          <UInput
            v-model="state.email"
            type="email"
            :color="color"
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
            :color="color"
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
            :color="color"
            name="address"
            placeholder="Masukkan alamat"
            size="lg"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Password" name="password">
          <InputPassword
            v-model="state.password"
            :color="color"
            name="password"
            placeholder="Masukkan password"
            size="lg"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Konfirmasi Password" name="password_confirm">
          <InputPassword
            v-model="state.password_confirm"
            :color="color"
            name="password_confirm"
            placeholder="Konfirmasi password"
            size="lg"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Foto Profil" name="photo" class="md:col-span-2">
          <UFileUpload
            v-slot="{ open, removeFile }"
            v-model="state.photo"
            variant="button"
            name="photo"
            accept="image/jpg, image/jpeg"
          >
            <UButton
              label="Pilih foto profil"
              trailing-icon="ci:cloud-upload"
              variant="outline"
              color="neutral"
              class="text-muted"
              size="lg"
              block
              @click="open()"
            />
            <p v-if="state.photo" class="text-xs text-muted mt-1.5">
              {{ state.photo.name }}

              <UButton
                label="Hapus"
                color="error"
                variant="link"
                size="xs"
                class="p-0"
                @click="removeFile()"
              />
            </p>
          </UFileUpload>
        </UFormField>
      </div>
      <UButton
        type="submit"
        label="Tambah"
        :color="color"
        size="lg"
        :loading="loading"
        block
      />
    </UForm>
  </div>
</template>
