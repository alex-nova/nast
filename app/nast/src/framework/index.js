import Vue from 'vue'
import { sync, } from 'vuex-router-sync'
// import installNastUI from 'nast-ui/utils/webpack'
import App from './App.vue'
import { store as userStores, } from './userApp'
import { initGlobalVariables, initLibVariables, initApiVariables, } from './initVariables/index'
import initGlobalMixins from './initMixins/index'
import initStores from './initStores/index'
import initLibs from './../libs'
import elements from './translate'


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
  global.__ = (key) => $n.get(elements, key, key)
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
  const router = libs.pages.coreInitRouter(Vue)
  
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
      router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        let diffed = false
        const activated = matched.filter((c, i) => {
          return diffed || (diffed = (prevMatched[i] !== c))
        })
        const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _)
        if (!asyncDataHooks.length) {
          return next()
        }
      
        Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to, })))
          .then(() => next()).catch(next)
      })
    
      app.$mount('#app')
    })
  }
  
  return app
}
