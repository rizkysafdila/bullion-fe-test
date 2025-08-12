export const useAuthStore = defineStore('auth', () => {
  const username = ref<string>()
  const token = useCookie('token')

  const login = async (credentials: { email: string, password: string }) => {
    const { $fetch } = useApi()
    const res: APIResponse<ILoginResponse> = await $fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      body: credentials,
    })
    token.value = res.data.token
    username.value = res.data.name
  }

  // const register = async (data: { name: string, email: string, password: string }) => {
  //   const { $fetch } = useApi()
  //   const res: any = await $fetch('/register', {
  //     method: 'POST',
  //     body: data,
  //   })
  //   token.value = res.data.token
  //   user.value = res.data.user
  // }

  const logout = () => {
    token.value = null
    username.value = undefined
  }

  return {
    username,
    token,
    login,
    // register,
    logout,
  }
})
