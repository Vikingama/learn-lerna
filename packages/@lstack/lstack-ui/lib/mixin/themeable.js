export default {
  name: 'Themeable',
  props: {
    theme: {
      type: String,
      validator(val) {
        return ['none', 'light', 'dark'].indexOf(val) !== -1
      },
    },
  },
  inject: {
    pTheme: { default: undefined },
  },
  provide() {
    return {
      pTheme: this.cTheme,
    }
  },
  computed: {
    cTheme() {
      if (this.theme) return this.theme
      if (this.pTheme) return this.pTheme
      return undefined
    },
    cThemeClass() {
      return this.cTheme ? `theme-${this.cTheme}` : ''
    },
  },
}
