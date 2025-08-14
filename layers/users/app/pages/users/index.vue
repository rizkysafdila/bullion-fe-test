<script lang="ts" setup>
import { ModalEditUser, ModalViewUser } from '#components'

const toast = useToast()
const userStore = useUserStore()
const { fetchUserList, fetchUserById, updateUser, deleteUser } = userStore
const { users, user } = storeToRefs(userStore)

const userId = ref<string>()

const overlay = useOverlay()
const editModal = overlay.create(ModalEditUser)

// Fetch User List
const { pending: pendingUserList, refresh } = await useAsyncData(
  'user-list',
  () => fetchUserList(),
)

// Fetch Detailed User
const { execute: executeDetailedUser } = await useAsyncData(
  'user-detail',
  () => fetchUserById(userId.value!),
  { immediate: false },
)

async function editData(id: string) {
  userId.value = id
  await executeDetailedUser()
  editModal.open({
    data: user.value!,
    onSubmit: async (body) => {
      editModal.patch({
        loading: true,
      })
      const { error } = await updateUser(id, body)

      if (!error.value) {
        editModal.close()
        toast.add({ title: 'User updated successfully', color: 'success' })
      }
      else {
        toast.add({ title: 'Failed to update user', color: 'error' })
      }

      editModal.patch({
        loading: false,
      })
      refresh()
    },
  })
}

async function deleteData(id: string) {
  const { pending } = await deleteUser(id)
  if (!pending.value) {
    refresh()
  }
}
</script>

<template>
  <div>
    <PageHeader title="User Aktif" add-button />
    <TableView
      :columns="USER_COLUMNS"
      :data="users"
      :loading="pendingUserList"
      :modal-view-form="ModalViewUser"
      @edit-data="editData"
      @delete-data="deleteData"
    />
  </div>
</template>
