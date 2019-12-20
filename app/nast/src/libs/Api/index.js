import axios from 'axios'
import ApiInterface from './../../interfaces/libs/Api'
import ApiObject from './ApiObject'

/**
 *
 */
class Api extends ApiInterface {
  _instances = {}
  _config = {}
  
  /**
   *
   */
  constructor() {
    super()
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
      config: (config) => this.config(config),
      create: (name, config) => this.create(name, config),
    }
  }
  
  /**
   * @param {ApiConfigInterface} config
   */
  config(config) {
    this.create('default', config)
  }
  
  /**
   * @param {String} name
   * @param {ApiConfigInterface} config
   */
  create(name, config) {
    if (config.useVersion !== undefined) {
      this.config.useVersion = config.useVersion
    }
    if (config.baseUrl !== undefined) {
      this.config.baseUrl = $n.trim(config.baseUrl, '/')
    }
    this.instances[name] = axios.create(config)
  }
  
  /**
   * @param {String} url
   * @param {String} method
   * @param {String} name
   * @return {ApiObject}
   */
  request(url, method, name = 'default') {
    return new ApiObject(url, method, this.instances[name], this._config)
  }
}

export default Api
