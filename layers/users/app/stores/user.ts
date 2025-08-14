import type { IDetailedUser, IUser } from '../types/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<IUser[]>([])
  const user = ref<IDetailedUser | null>(null)

  // Getters
  const userData = computed(() => {
    if (!user.value)
      return {}
    const { _id, photo, ...rest } = user.value
    rest.date_of_birth = formatDateLong(rest.date_of_birth)
    rest.gender = rest.gender === 'male' ? 'Laki-laki' : 'Perempuan'

    return rest
  })

  // Actions
  const fetchUserList = async (query?: any) => {
    const data = await apiFetchAsyncData<APIResponse<IUser[]>>(GET_USER_LIST_ENDPOINT, {
      method: 'GET',
      query,
    })
    users.value = data.data

    return data
  }

  const fetchUserById = async (id: string) => {
    const data = await apiFetchAsyncData<APIResponse<IDetailedUser>>(GET_DETAILED_USER_ENDPOINT.replace(':id', id), { method: 'GET' })
    user.value = data.data

    return data
  }

  const createUser = async (body: FormData) => {
    const { error, pending } = await useAPI<APIResponse<IRegisterResponse>>(REGISTER_ENDPOINT, {
      method: 'POST',
      body,
    })

    return { error, pending }
  }

  const updateUser = async (id: string, body: Partial<IDetailedUser>) => {
    const { error, pending } = await useAPI(UPDATE_USER_ENDPOINT.replace(':id', id), {
      method: 'PUT',
      body,
    })

    return { pending, error }
  }

  const deleteUser = async (id: string) => {
    const { error, pending } = await useAPI(DELETE_USER_ENDPOINT.replace(':id', id), { method: 'DELETE' })

    return { pending, error }
  }

  return {
    fetchUserList,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    users,
    user,
    userData,
  }
})
