import StorePluginInterface from '../../StorePluginInterface'
import storeModule from './store/api'
import content from './content'
import auth from './auth'
import fetcher from './fetcher'

/**
 *
 */
export default Object.assign({}, StorePluginInterface, {
  content: {},
  auth: {},
  fetcher: {},
  http: {},
  api: {},
  
  init({ store, http, storage, api, options, }) {
    this.store = store
    this.http = http
    this.api = api
    this.storeModule = storeModule
    this.moduleName = options.storeName
    
    this.register()
    
    this.auth = auth.init({ store, http, storeName: `${options.storeName}/${options.authStoreName}`, })
    this.content = content.init({ store, storage, auth: this.auth, storeName: `${options.storeName}/${options.contentStoreName}`, })
    this.fetcher = fetcher.init({
      api,
      content: this.content.state(),
      fetch: (api) => this.fetch(api),
      options: {
        timeout: options.timeout,
      },
    })
    
    return this
  },
  
  start() {
    this.fetcher.start()
  },
  
  request(method, url, params = {}, api = 'base') {
    let baseURL = $app.config(`api.${api}.${$env.prod ? 'prod' : 'dev'}`, '')
    if (baseURL.indexOf('http') !== 0) {
      baseURL = `${$app.config('baseUrl').slice(0, -1)}${baseURL}`
    }
    
    return this.http.send({
      url,
      method,
      baseURL,
      ...params,
    })
  },
  
  fetch(api) {
    return content.fetch(api).then((status) => {
      if (status === 0) {
        this.store.commit('setOnline', false)
      } else if (!this.state().online) {
        this.store.commit('setOnline', true)
      }
    })
  },
  
  login({ token, user, }) {
    this.auth.updateAuth({ token, user, })
    this.content.updateNames(this.api)
  },
  
  logout() {
    this.auth.clearAuth()
    this.content.updateNames(this.api)
  },
})
