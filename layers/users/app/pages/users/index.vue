<script lang="ts" setup>
import { ModalEditUser, ModalViewUser } from '#components'

const userStore = useUserStore()
const { fetchUserList, fetchUserById, deleteUser } = userStore
const { users, user } = storeToRefs(userStore)

const userId = ref<string>()
const loading = ref<boolean>(false)

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

async function handleEditData(id: string) {
  userId.value = id
  await executeDetailedUser()
  editModal.open({
    data: user.value!,
    onSubmit: (body) => {
      // loading.value = true
      console.log(body)
    },
  })
}

async function deleteData(id: string) {
  await deleteUser(id)
  refresh()
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
      @edit-data="handleEditData"
      @delete-data="deleteData"
    />
  </div>
</template>
