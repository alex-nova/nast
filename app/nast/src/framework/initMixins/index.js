import toggler from './../../_oold/needPlaceToLibs/plugins/toggler/index'


export default (Vue, libs) => {
  Vue.use(toggler, {})
  
  $n.map(libs, (lib) => {
    if (lib.installMixin) {
      Vue.mixin(lib.installMixin())
    }
  })
}
