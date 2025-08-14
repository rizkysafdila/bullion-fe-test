export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  if (!token.value && !['/admin/login', '/register'].includes(to.path)) {
    return navigateTo('/admin/login')
  }

  if (token.value && ['/admin/login'].includes(to.path)) {
    return navigateTo('/users')
  }
})
