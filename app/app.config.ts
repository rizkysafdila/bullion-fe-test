export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'flamingo',
      secondary: 'coral-blue',
      neutral: 'slate',
    },
    formField: {
      slots: {
        label: 'font-semibold',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    select: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    selectMenu: {
      slots: {
        base: 'cursor-pointer',
      },
    },
  },
})
