<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const toast = useToast()
const authStore = useAuthStore()
const { register } = authStore

const loading = ref<boolean>(false)

async function handleRegister(data: any) {
  loading.value = true
  try {
    await register(data)
    toast.add({ title: 'Register successful', color: 'success' })
    navigateTo('/dashboard/users')
  }
  catch (error: any) {
    toast.add({ title: error?.data?.message || 'Register failed', color: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-1 justify-center">
    <AuthRegisterForm :loading="loading" @submit="handleRegister" />
  </div>
</template>
