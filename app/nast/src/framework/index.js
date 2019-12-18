import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync, } from 'vuex-router-sync'
import installNastUI from 'nast-ui/utils/webpack'
import App from './App.vue'
import { routes, store, } from './userApp'
import { initGlobalVariables, initLibVariables, } from './initVariables/index'
import initGlobalMixins from './initMixins/index'
import initStores from './initStores/index'
import initLibs from './../libs'


const createStore = (libs) =>{
  libs.store.corePatchStore(Vuex)
  Vue.use(Vuex)
  
  return new Vuex.Store({
    modules: {
      ...store,
    },
  })
}

const createRouter = (libs) => {
  Vue.use(Router)
  return new Router(libs.pages.coreInitRouter(Vue, routes))
}

const createUI = () => {
  if ($env.prod) {
    installNastUI(Vue)
  } else {
    Vue.use(require('nast-ui/src').default)
  }
}

/**
 * Create app.
 *
 * @return {object}
 */
export default () => {
  initGlobalVariables()
  
  const libs = initLibs()
  
  initLibVariables(libs)
  initGlobalMixins(libs)
  
  createUI()
  
  const store = createStore(libs)
  const router = createRouter(libs)
  
  sync(store, router)
  
  initStores(store)
  
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
