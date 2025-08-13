import type { TableColumn } from '@nuxt/ui'
import type { IUser } from '../types/user'
import { UBadge } from '#components'

// Endpoints
export const GET_USER_LIST_ENDPOINT = '/admin'
export const GET_DETAILED_USER_ENDPOINT = '/admin/:id'
export const UPDATE_USER_ENDPOINT = '/admin/:id/update'
export const DELETE_USER_ENDPOINT = '/admin/:id/delete'

// Table Columns
export const USER_COLUMNS: TableColumn<IUser>[] = [
  {
    accessorKey: '_id',
    header: () => h('div', { class: 'text-center' }, 'Account ID'),
    cell: ({ row }) => h('span', { class: 'block text-center' }, `#${row.original._id.slice(-5)}`),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'date_of_birth',
    header: 'Date',
    cell: ({ row }) => formatDate(row.original.date_of_birth),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-center' }, 'Status'),
    cell: () => h(UBadge, {
      label: 'Registered',
      variant: 'soft',
      color: 'success',
      class: 'w-full rounded-full',
    }),
  },
]

// Form Fields
