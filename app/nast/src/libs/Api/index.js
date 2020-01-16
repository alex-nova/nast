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
          return (name, params) => $n.get(state, `${name}.${this.getApiKey(params)}.data`, {})
        },
        loading: (state) => {
          return (name, params) => $n.get(state, `${name}.${this.getApiKey(params)}.loading`, false)
        },
      },
      mutations: {
        set: (state, { name, params, loading, data, }) => {
          if (!state[name]) {
            state[name] = {}
          }
          state[name][this.getApiKey(params)] = { data, loading, }
        },
      },
    }
  }
  
  /**
   * @param {Object} router
   */
  coreUpdateRouter(router) {
    router.beforeResolve((to, from, next) => {
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)
      let diffed = false
      const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c))
      })
      const asyncDataHooks = activated.map((c) => c.load).filter((_) => _)
      if (!asyncDataHooks.length) {
        return next()
      }
    
      const promises = []
      $n.each(asyncDataHooks, (hook) => {
        $n.reduce(hook(), (result, value) => {
          const name = $n.isString(value) ? value : value.name
          const params = $n.isString(value) ? [] : value.params
          promises[`${name}.${this.getApiKey(params)}`] = this.load(name, params)
          return result
        }, {})
      })
      
      Promise.all(Object.values(promises)).then(() => next()).catch(next)
      next()
    })
  }
  
  /**
   * @return {CustomApi}
   */
  coreInitApi() {
    return this._userApi
  }
  
  /**
   * @return {Object}
   */
  coreInitData() {
    const data = {}
    $n.each(this._userData, (value, name) => {
      data[name] = {
        get: (...args) => this.getData(name, args),
        loading: (...args) => this.getLoading(name, args),
        load: (...args) => this.load(name, args),
        reload: (...args) => this.load(name, args).then(),
        toComponent: (...args) => this.toComponent(name, args),
      }
    })
    
    return data
  }
  
  /**
   * @param {Array} args
   * @return {string}
   */
  getApiKey(args) {
    return args.join('') || '_'
  }
  
  /**
   * @param {String} name
   * @param {Array} args
   * @return {*}
   */
  getData(name, args) {
    return this._store.getter('api.data')(name, args)
  }
  
  /**
   * @param {String} name
   * @param {Array} args
   * @return {*}
   */
  getLoading(name, args) {
    return this._store.getter('api.loading')(name, args)
  }
  
  /**
   * @param {String} name
   * @param {Array} args
   * @return {Promise}
   */
  load(name, args) {
    this._store.mutation('api.set', { name: name, params: args, loading: true, data: null, })
    return this._userData[name](...args).callback((response) => {
      const data = $config('api.getData')(response)
      $app.store.mutation('api.set', { name: name, params: args, loading: false, data, })
      return response
    }, '_api.data')
  }
  
  /**
   * @param {String} name
   * @param {*} args
   * @return {function(...[*]=)}
   */
  toComponent(name, args) {
    return (params) => {
      if (this.getLoading(name, args) || (this.getData(name, args))) {
        return new Promise(((resolve) => resolve(this.getData(name, args))))
      } else {
        return this.load(name, args)
      }
    }
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
