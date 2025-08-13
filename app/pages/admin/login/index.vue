<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const toast = useToast()
const authStore = useAuthStore()
const { login } = authStore

const loading = ref<boolean>(false)

async function handleLogin(data: any) {
  const { error, pending } = await login(data)

  watchEffect(() => {
    loading.value = pending.value
  })

  if (!pending.value) {
    toast.add({ title: error.value?.message || 'Login failed', color: 'error' })
  }

  if (!error.value) {
    toast.add({ title: 'Login successful', color: 'success' })
    navigateTo('/users')
  }
}
</script>

<template>
  <div class="flex flex-1 justify-center">
    <AuthLoginForm :loading="loading" @submit="handleLogin" />
  </div>
</template>
