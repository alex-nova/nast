import axios from 'axios'
import ApiInterface from './../../interfaces/libs/Api'
import ApiObject from '../../interfaces/global/ApiObject'

/**
 *
 */
class Api extends ApiInterface {
  _instances = {}
  _configs = {}
  _userApi = {}
  _userModels = {}
  /** @var {StoreInterface} */
  _store
  
  /**
   * @param {Object} userApi
   * @param {StoreInterface} store
   */
  constructor(userApi, store) {
    super(userApi, store)
    this._userApi = new userApi.api() // eslint-disable-line new-cap
    this._userModels = new userApi.models() // eslint-disable-line new-cap
    
    $n.each($config('api.servers'), (urls, name) => {
      this._instances[name] = axios.create({
        baseURL: $n.get(urls, $env.prod ? 'prod' : 'dev', '/'),
      })
      this._configs[name] = []
    })
  }
  
  /**
   *
   * @return {ApiGlobalInterface}
   */
  installGlobals() {
    return {
      get: (url, name = 'default') => this._request(url, 'get', name),
      post: (url, name = 'default') => this._request(url, 'post', name),
      put: (url, name = 'default') => this._request(url, 'put', name),
      patch: (url, name = 'default') => this._request(url, 'patch', name),
      delete: (url, name = 'default') => this._request(url, 'delete', name),
      config: (config, name) => this.config(config, name),
    }
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
  coreInitModels() {
    return this._userModels
  }
  
  /**
   * @param {ApiConfigInterface} config
   * @param {String} name
   */
  config(config, name = 'default') {
    $n.merge(this._configs[name], config)
  }
  
  /**
   * @private
   * @param {String|Array} url
   * @param {String} method
   * @param {String} name
   * @return {ApiObject}
   */
  _request(url, method, name = 'default') {
    return new ApiObject(url, method, this._instances[name], this._configs[name])
  }
}

export default Api
