import axios from 'axios'
import ApiInterface from './../../interfaces/libs/Api'
import ApiObject from './ApiObject'

/**
 *
 */
class Api extends ApiInterface {
  _instances = {}
  _config = {}
  _userApi = {}
  _userData = {}
  /**
   * @param {StoreInterface}
   */
  _store
  
  /**
   * @param {Object} userApi
   * @param {StoreInterface} store
   */
  constructor(userApi, store) {
    super()
    this._userApi = new userApi.api()
    this._userData = new userApi.data()
    this._store = store
    this.create('default')
  }
  
  /**
   *
   * @return {ApiGlobalInterface}
   */
  installGlobals() {
    return {
      get: (url, name = 'default') => this.request(url, 'get', name),
      post: (url, name = 'default') => this.request(url, 'post', name),
      put: (url, name = 'default') => this.request(url, 'put', name),
      patch: (url, name = 'default') => this.request(url, 'patch', name),
      delete: (url, name = 'default') => this.request(url, 'delete', name),
      config: (config, name) => this.config(config, name),
      create: (name, config) => this.create(name, config),
      data: () => this._userApi.data,
    }
  }
  
  /**
   * @return {ApiStoreInterface}
   */
  installStore() {
    return {
      namespaced: true,
      state: {},
      getters: {
        data: (state) => {
          return (name, params = '_') => $n.get(state, `${name}.${params}.data`, null)
        },
        loading: (state) => {
          return (name, params = '_') => $n.get(state, `${name}.${params}.loading`, false)
        },
      },
      mutations: {
        set(state, { name, params = '_', loading, data, }) {
          if (!state[name]) {
            state[name] = {}
          }
          state[name][params] = { data, loading, }
        },
      },
    }
  }
  
  /**
   *
   */
  coreInitApi() {
    /**
     * @return {CustomApi}
     */
    global.$api = () => this._userApi
  }
  
  /**
   *
   */
  coreInitData() {
    const data = {}
    $n.each(this._userData, (value, name) => {
      data[name] = {
        get: (...args) => this.get(name, ...args),
        loading: (...args) => this.loading(name, ...args),
        load: (...args) => this.load(name, ...args),
        toComponent: () => {},
      }
    })
    /**
     * @return {CustomApiData}
     */
    global.$data = () => data
  }
  
  /**
   * @param {String} name
   * @param {*} args
   * @return {Boolean}
   */
  get(name, ...args) {
    return this._store.getter('api.data')(name, args.join('') || '_')
  }
  
  /**
   * @param {String} name
   * @param {*} args
   * @return {Boolean}
   */
  loading(name, ...args) {
    return this._store.getter('api.loading')(name, args.join('') || '_')
  }
  
  /**
   * @param {String} name
   * @param {*} args
   * @return {Promise}
   */
  load(name, ...args) {
    this._store.mutation('api.set', { name: name, params: args.join('') || '_', loading: true, data: null, })
    return this._userData[name](...args).callback((response) => {
      const data = $config('api.getData')(response)
      $app.store.mutation('api.set', { name: name, params: args.join('') || '_', loading: false, data, })
      return response
    }, '_api.data')
  }
  
  /**
   * @param {ApiConfigInterface} config
   * @param {String} name
   */
  config(config, name = 'default') {
    $n.merge(this._instances[name].defaults, config)
  }
  
  /**
   * @param {String} name
   * @param {ApiConfigInterface} config
   */
  create(name, config = {}) {
    if (config.useVersion !== undefined) {
      this.config.useVersion = config.useVersion
    }
    
    let baseURL = $config(`api.servers.${name}.${$env.prod ? 'prod' : 'dev'}`)
    baseURL = $n.trim(config.baseURL || baseURL, '/')
    
    this._instances[name] = axios.create({
      ...config,
      baseURL,
    })
  }
  
  /**
   * @param {String|Array} url
   * @param {String} method
   * @param {String} name
   * @return {ApiObject}
   */
  request(url, method, name = 'default') {
    return new ApiObject(url, method, this._instances[name], this._config)
  }
}

export default Api
