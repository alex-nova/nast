
const plugin = {
  install(Vue, options) {
    Vue.mixin({
      data: () => ({
        toggler_toggles: {},
      }),
      computed: {
        $toggler() {
          return this.toggler_toggles
        },
      },
      methods: {
        $toggle(name, show) {
          this.$set(this.toggler_toggles, name, show !== undefined ? show : !this.toggler_toggles[name])
        },
      },
    })
  },
}

export default plugin
