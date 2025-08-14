import type { NavigationMenuItem, SelectItem } from '@nuxt/ui'

export const MENU_LINKS: NavigationMenuItem[][] = [
  [
    { label: 'Dashboard', icon: 'lucide:home', to: '/' },
    { label: 'User Aktif', icon: 'lucide:users', to: '/users' },
    { label: 'Menu 2', icon: 'lucide:square', to: '#' },
    { label: 'Menu 3', icon: 'lucide:square', to: '#' },
    { label: 'Menu 4', icon: 'lucide:square', to: '#' },
  ],
]

export const genderItems = ref<SelectItem[]>([
  { label: 'Pria', value: 'male' },
  { label: 'Wanita', value: 'female' },
])
