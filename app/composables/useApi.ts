import type { UseFetchOptions } from 'nuxt/app'

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('token')

  return useFetch(url, {
    ...options,
    baseURL: config.public.apiBaseUrl,
    onRequest({ options }) {
      if (token.value) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}
