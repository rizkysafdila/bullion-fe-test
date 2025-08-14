<script setup lang="ts">
const authStore = useAuthStore()
const { logout } = authStore
const isSidebarOpen = ref<boolean>(true)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function handleLogout() {
  logout()
  navigateTo('/admin/login')
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside
      class="hidden md:block w-3xs bg-default border-r border-neutral-200 py-10 transition-transform"
      :class="{ 'w-fit': !isSidebarOpen }"
    >
      <div class="flex justify-between items-center px-4 mb-7">
        <NuxtImg v-if="isSidebarOpen" src="/images/logo-bei.svg" alt="Logo BEI" class="w-28 h-full pl-3" />
        <UButton
          icon="lucide:menu"
          variant="ghost"
          color="neutral"
          :class="{ 'mx-auto': !isSidebarOpen }"
          :block="!isSidebarOpen"
          @click="toggleSidebar"
        />
      </div>

      <UNavigationMenu
        :items="MENU_LINKS"
        :collapsed="!isSidebarOpen"
        orientation="vertical"
        color="primary"
        tooltip
        :ui="{
          list: 'space-y-2',
          linkLeadingIcon: 'text-white',
          link: 'p-0',
        }"
      >
        <template #item="{ item }">
          <NuxtLink
            :to="item.to"
            class="px-6 py-3 w-full flex items-center gap-2 transition-colors"
            :class="{
              'bg-primary text-white': $route.path === item.to,
              'text-gray-700 hover:bg-gray-100': $route.path !== item.to,
            }"
          >
            <UIcon :name="item.icon!" size="20" />
            <span v-if="isSidebarOpen">
              {{ item.label }}
            </span>
          </NuxtLink>
        </template>

        <template #list-trailing>
          <USeparator />
          <UButton
            label="Keluar"
            icon="lucide:log-out"
            variant="ghost"
            color="error"
            size="lg"
            class="mt-auto rounded-none w-full px-6 py-3"
            @click="handleLogout"
          />
        </template>
      </UNavigationMenu>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-6 bg-elevated">
      <slot />
    </main>
  </div>
</template>
