
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
        $toggle(name, value) {
          this.$set(this.toggler_toggles, name, value !== undefined ? value : !this.toggler_toggles[name])
        },
      },
    })
  },
}

export default plugin
