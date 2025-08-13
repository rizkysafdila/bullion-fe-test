export const useAuthStore = defineStore('auth', () => {
  const username = ref<string>()
  const token = useCookie('token')

  const login = async (credentials: { email: string, password: string }) => {
    const { data, pending, error } = await useFetch<ILoginResponse>(LOGIN_ENDPOINT, {
      method: 'POST',
      body: credentials,
    })
    token.value = data.value?.token
    username.value = data.value?.name

    return { pending, error }
  }

  const register = async (data: { name: string, email: string, password: string }) => {
    const { pending, error } = await useFetch<IRegisterResponse>('/register', {
      method: 'POST',
      body: data,
    })

    return { pending, error }
  }

  const logout = () => {
    token.value = null
    username.value = undefined
  }

  return {
    username,
    token,
    login,
    register,
    logout,
  }
})
