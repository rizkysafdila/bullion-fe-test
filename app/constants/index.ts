import type { SelectItem } from '@nuxt/ui'

export const genderItems = ref<SelectItem[]>([
  { label: 'Pria', value: 'male' },
  { label: 'Wanita', value: 'female' },
])
