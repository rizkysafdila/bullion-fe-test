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
    const { error } = await register(data)

    if (!error.value) {
      toast.add({ title: 'Register berhasil', color: 'success' })
      navigateTo('/users')
    }
    else {
      toast.add({ title: 'Register gagal', color: 'error' })
    }
  }
  catch (error: any) {
    toast.add({ title: error?.data?.message || 'Register gagal', color: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-1 justify-center">
    <div>
      <h1 class="font-bold text-3xl mb-8">
        Daftar
      </h1>
      <AuthRegisterForm color="secondary" :loading="loading" @submit="handleRegister" />
    </div>
  </div>
</template>
