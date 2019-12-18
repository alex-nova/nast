import axios from 'axios/index'
import BaseHttp from '../_interfaces/Http'


/**
 *
 */
class Http extends BaseHttp {
  /**
   *
   */
  instance
  
  /**
   *
   */
  constructor() {
    super()
    
    this.instance = axios.create({})
  }
  
  /**
   * @param {string} method
   * @param {string} url
   * @param {object?} params
   * @param {object?} options TODO
   * @return {Promise}
   */
  send(method, url, params, options = {}) {
    return this.instance({ method, url, params, ...options, })
  }
  
  /**
   * @param {string} baseUrl
   */
  setBaseUrl(baseUrl) {
    this.instance.defaults.baseURL = baseUrl
  }
  
  /**
   * @param {object} headers { header1: 'value1', }
   */
  setHeaders(headers) {
    $n.map(headers, (key) => {
      this.instance.defaults.headers.common[key] = headers[key]
    })
  }
}

export default Http
