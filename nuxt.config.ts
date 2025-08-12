/* eslint-disable node/prefer-global/process */
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',

  colorMode: {
    preference: 'light',
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  imports: {
    dirs: [
      'constants',
      'types',
    ],
  },
})
