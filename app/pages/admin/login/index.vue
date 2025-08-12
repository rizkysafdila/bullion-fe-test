<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const toast = useToast()
const authStore = useAuthStore()
const { login } = authStore

const loading = ref<boolean>(false)

async function handleLogin(data: any) {
  loading.value = true
  try {
    await login(data)
    toast.add({ title: 'Login successful', color: 'success' })
    navigateTo('/dashboard/users')
  }
  catch (error: any) {
    toast.add({ title: error?.data?.message || 'Login failed', color: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-1 justify-center">
    <AuthLoginForm :loading="loading" @submit="handleLogin" />
  </div>
</template>
