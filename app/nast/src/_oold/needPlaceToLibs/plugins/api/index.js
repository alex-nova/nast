import Vue from 'vue/types'
import utils from './utils'
import apiStore from './store'
import pluginContent from './content'

import authPlugin from './auth'
import contentPlugin from './content'
import apiPlugin from './api'
import fetcher from './fetcher'
import http from './../../../dependencies/http'
import storage from './../../../dependencies/storage'


export default ({ store, api, }) => {
  const options = {
    storeName: 'index.js',
    authStoreName: 'auth',
    contentStoreName: 'content',
    timeout: 5,
  }
  
  const apiInstance = apiPlugin.init({
    store,
    http,
    storage,
    api: api.fetch,
    options,
  })
  
  // apiInstance.login({ ...store.state.api.auth, })
  
  // if ($env.platform !== 'server') {
  //   apiInstance.start()
  // }
  
  // apiStore.init(store)
  // const content = pluginContent.init({
  //   store,
  //   storage: $app.storage,
  //   storeModule: {},
  // })
  // utils.login(store, { ...store.state.api.auth, }, api)
  
  // const f = fetcher.init(store, api.fetch, $app.config('api.timeout'), content)
  // if ($env.platform !== 'server') {
  //   f.start()
  // }
  
  Vue.use({
    install(Vue) {
      Vue.mixin({
        computed: {
          $api() {
            return {
              ...api,
            }
          },
          $fetcher: () => f,
          $auth() {
            return {
              user: this.$store.state.index.auth.user,
              can: (permissions) => apiInstance.auth.can(permissions),
              login: (data) => apiInstance.login(data),
              logout: () => apiInstance.logout(),
            }
          },
          $content() {
            return this.$store.state.index.content
          },
        },
        watch: {
          '$store.state.api.auth.user'() {
            this.api_load(this)
          },
        },
        beforeRouteEnter(to, from, next) {
          next((vm) => {
            vm.api_load(vm)
          })
        },
        methods: {
          api_load(vm) {
            // const { fetch, } = vm.$options
            // if (fetch && $n.isArray(fetch)) {
            //   const names = $n.reduce(fetch, (result, name) => {
            //     if (!api.fetch[name]) {
            //       $app.log.info(`Plugin Api: api with name ${name} not found`)
            //       return result
            //     }
            //
            //     if (vm.$content[name] && (api.fetch[name].disabled || vm.$content[name].outdatedAt <= $app.date())) {
            //       result.push(name)
            //     }
            //     return result
            //   }, [])
            //   vm.$fetcher.forceFetch(names)
            // }
          },
        },
      })
    },
  })
}

