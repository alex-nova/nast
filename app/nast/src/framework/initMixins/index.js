import toggler from './../../_oold/needPlaceToLibs/plugins/toggler/index'


export default (Vue, libs) => {
  Vue.use(toggler, {})
  Vue.use({
    install(Vue, options) {
      Vue.mixin({
        data: () => ({
          var_vars: {},
        }),
        methods: {
          $var(name, value = undefined) {
            if (value === undefined) {
              return this.var_vars[name]
            } else {
              this.$set(this.var_vars, name, value)
            }
          },
        },
      })
    },
  }, {})
  
  $n.map(libs, (lib) => {
    if (lib.installMixin) {
      Vue.mixin(lib.installMixin())
    }
  })
  
  Vue.mixin({
    computed: {
      $app() {
        return $app
      },
      $api() {
        return $api
      },
      $config() {
        return $config
      },
      $n() {
        return $n
      },
    },
  })
}
