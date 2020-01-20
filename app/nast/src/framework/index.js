import Vue from 'vue'
import { sync, } from 'vuex-router-sync'
// import installNastUI from 'nast-ui/utils/webpack'
import App from './App.vue'
import { store as userStores, } from './userApp'
import { initGlobalVariables, initLibVariables, initApiVariables, } from './initVariables/index'
import initGlobalMixins from './initMixins/index'
import initStores from './initStores/index'
import initLibs from './../libs'


const createUI = () => {
  // if ($env.prod) {
  //   installNastUI(Vue)
  // } else {
  Vue.use(require('nast-ui/src').default)
  // }
}

/**
 * Create app.
 *
 * @return {object}
 */
export default () => {
  initGlobalVariables()
  
  // TODO delete
  global.__ = (key) => key
  Vue.mixin({
    methods: {
      __(key) {
        return __(key)
      },
    },
  })
  // TODO
  
  const libs = initLibs()
  
  initLibVariables(libs)
  initApiVariables(libs)
  initGlobalMixins(Vue, libs)
  
  createUI()
  const store = libs.store.coreInitStore(Vue, {
    ...userStores,
    ...initStores(libs),
  })
  const router = libs.router.coreInitRouter(Vue)
  
  sync(store, router)
  
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })
  
  
  if ($env.type !== 'server') {
    // const initState = (store) => {
    //   return $app.storage.get('content').then((result) => {
    //     const storageValue = JSON.parse(result)
    //     const ssrValue = window.__INITIAL_STATE__
    //
    //     if (ssrValue) {
    //       store.replaceState(ssrValue)
    //       offliner.refreshStore()
    //     }
    //
    //     offliner.start()
    //   })
    // }
    //
    // initState(store).then(() => {
    // app.$mount('#app')
    // })
  
    router.onReady(() => {
      libs.api.coreUpdateRouter(router)
      app.$mount('#app')
    })
  }
  
  return app
}
