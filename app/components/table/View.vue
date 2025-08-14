<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { ModalDeleteConfirmation, TableAction } from '#components'
import { getPaginationRowModel } from '@tanstack/vue-table'

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

const table = useTemplateRef('table')
const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
})

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
    icon: 'lucide:trash-2',
    iconClass: 'text-red-500',
    iconBgClass: 'bg-red-100 border-8 border-red-50',
    onSubmit: () => {
      deleteModal.patch({
        loading: props.loading,
      })
      emit('deleteData', id)
      deleteModal.close()
    },
    onClose: () => deleteModal.close(),
  })
}
</script>

<template>
  <div class="bg-white dark:bg-accented p-6 space-y-4 rounded-xl">
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="data"
      :columns="columns"
      :loading="loading"
      :sticky="true"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
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
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        :ui="{
          first: 'hidden',
          last: 'hidden',
        }"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
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
