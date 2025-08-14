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
    const { error } = await login(data)

    if (!error.value) {
      toast.add({ title: 'Login berhasil', color: 'success' })
      navigateTo('/users')
    }
    else {
      toast.add({ title: 'Login gagal', color: 'error' })
    }
  }
  catch (error: any) {
    toast.add({ title: error?.data?.message || 'Login gagal', color: 'error' })
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
