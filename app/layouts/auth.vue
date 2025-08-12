<script lang="ts" setup>

</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-3">
    <div
      class="relative hidden lg:block p-6 md:p-10"
      :class="$route.path.includes('login') ? 'bg-flamingo-500' : 'bg-coral-blue-600'"
    >
      <NuxtImg src="/images/logo-bei-white.svg" alt="Logo BEI" class="w-28 h-auto relative z-20" />
      <NuxtImg
        src="/images/logomark-bei.png"
        alt="Logomark BEI"
        class="absolute inset-0 h-auto w-1/2 z-10"
      />
    </div>
    <div class="col-span-2 p-6 md:p-20">
      <slot />
    </div>
  </div>
</template>
