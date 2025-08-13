<script lang="ts" setup>
import type { IDetailedUser } from '../../types/user'

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  (e: 'edit', id: string): void
}>()

const userStore = useUserStore()
const { fetchUserById } = userStore
const { user, userData } = storeToRefs(userStore)

const { execute, pending } = await useAsyncData(
  'user-detail-show',
  () => fetchUserById(props.id),
  { immediate: false },
)

onMounted(async () => {
  await execute()
})

const labelMap: Partial<Record<keyof IDetailedUser, { label: string, colSpan?: number }>> = {
  first_name: { label: 'Nama Depan' },
  last_name: { label: 'Nama Belakang' },
  gender: { label: 'Jenis Kelamin' },
  date_of_birth: { label: 'Tanggal Lahir' },
  email: { label: 'Email', colSpan: 2 },
  phone: { label: 'No. Handphone', colSpan: 2 },
  address: { label: 'Alamat', colSpan: 2 },
}
</script>

<template>
  <UModal
    title="Lihat User"
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
      <div v-if="pending" class="flex justify-center items-center h-20">
        <UIcon name="lucide:loader-2" :size="36" class="animate-spin" />
      </div>
      <div v-else class="space-y-4">
        <div>
          <p class="font-bold text-center mb-4">
            Foto Profil
          </p>
          <NuxtImg
            :src="`data:image/jpeg;base64,${user?.photo}` || 'https://avatar.iran.liara.run/public/48'"
            :alt="user?.last_name"
            class="rounded-full w-20 h-20 object-cover mx-auto"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileItem
            v-for="(value, key) in userData"
            :key="key"
            :label="labelMap[key]?.label"
            :value="value"
            :col-span="labelMap[key]?.colSpan"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Edit"
        size="lg"
        block
        :disabled="pending"
        @click="emit('edit', user?._id!)"
      />
    </template>
  </UModal>
</template>
