<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { ModalDeleteConfirmation, TableAction } from '#components'

const props = defineProps<{
  loading: boolean
  columns: TableColumn<any>[]
  data: any
  // title: string
  modalViewForm?: Component
}>()

const emit = defineEmits<{
  (e: 'searchData', value: string): void
  (e: 'updatePage', value: number): void
  (e: 'editData', value: string): void
  (e: 'deleteData', value: string): void
}>()

const columns = computed((): TableColumn<any>[] => {
  return [
    ...props.columns,
    {
      id: 'actions',
      header: () => h('div', { class: 'text-center' }, 'Action'),
      cell: ({ row }) => h(TableAction, {
        onShow: () => showDetail(row.original?._id),
        onEdit: () => editData(row.original?._id),
        onDelete: () => confirmDelete(row.original?._id),
      }),
    },
  ]
})

const overlay = useOverlay()
const viewModal = props.modalViewForm ? overlay.create(props.modalViewForm) : undefined
const deleteModal = overlay.create(ModalDeleteConfirmation)

const loading = ref<boolean>(false)
const searchTimeoutId = ref<any>()
const search = ref<string>('')
const page = ref<number>(1)

async function showDetail(id: string) {
  viewModal?.open({
    id,
    onEdit: (id: string) => {
      overlay.closeAll()
      emit('editData', id)
    },
  })
}

function editData(id: string) {
  emit('editData', id)
}

function confirmDelete(id: string) {
  deleteModal.open({
    title: 'Anda yakin menghapus data ini?',
    subtitle: 'Data ini tidak dapat dikembalikan setelah dihapus.',
    icon: 'tabler:trash',
    iconClass: 'text-red-500',
    iconBgClass: 'bg-red-100 border-8 border-red-50',
    onSubmit: () => {
      emit('deleteData', id)
      deleteModal.close()
    },
    onClose: () => deleteModal.close(),
  })
}

watch(search, (value) => {
  if (searchTimeoutId.value)
    clearTimeout(searchTimeoutId.value)

  loading.value = true
  searchTimeoutId.value = setTimeout(() => {
    emit('searchData', value)
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="bg-white dark:bg-accented p-6 space-y-4 rounded-xl">
    <div class="flex gap-3">
      <!-- <UInput
        v-if="canSearch"
        v-model="search"
        class="flex-auto"
        icon="i-custom-search"
        :placeholder="`Cari ${title}`"
        variant="soft"
        size="sm"
      /> -->
    </div>
    <UTable
      :data="data"
      :columns="columns"
      :loading="loading"
      :sticky="true"
      class="flex-1"
      :ui="{
        tbody: '[&_tr:nth-child(odd)]:bg-primary-50',
      }"
    >
      <template #empty>
        Data tidak ditemukan
      </template>
    </UTable>
    <div class="flex justify-end">
      <UPagination
        variant="soft"
        active-variant="solid"
        :default-page="page"
        :items-per-page="data?.meta?.limit"
        :total="data?.meta?.total"
        :ui="{
          first: 'hidden',
          last: 'hidden',
        }"
        @update:page="p => emit('updatePage', p)"
      >
        <template #prev>
          <UButton label="Previous" color="neutral" variant="ghost" />
        </template>
        <template #next>
          <UButton label="Next" color="neutral" variant="ghost" />
        </template>
      </UPagination>
    </div>
  </div>
</template>
