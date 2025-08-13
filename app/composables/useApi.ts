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
    headers: {
      ...(options?.headers || {}),
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    },
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}
