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
    badge: {
      slots: {
        label: 'mx-auto',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    modal: {
      slots: {
        overlay: 'bg-black/50 backdrop-blur-xs',
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
    table: {
      slots: {
        tr: 'border-b-0',
        th: 'font-bold',
        td: 'text-neutral-900',
      },
    },
  },
})
