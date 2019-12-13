import BaseApi from './../_interfaces/Api'


/**
 *
 */
class Api extends BaseApi {
  /**
   *
   */
  config
  
  /**
   *
   */
  http
  
  /**
   *
   * @param {Config} config
   * @param {Http} http
   */
  constructor({ config, http, }) {
    super()
  
    this.config = config
    this.http = http
  }
  
  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {object} params
   * @param {object} options TODO
   * @param {string} server
   */
  request(method, url, params, options, server = 'default') {
    let baseURL = this.config(`api.${server}.${$env.prod ? 'prod' : 'dev'}`, '')
    if (baseURL.indexOf('http') !== 0) {
      baseURL = `${this.config('baseUrl').slice(0, -1)}${baseURL}`
    }
    this.http.send(method, url, params, { baseURL, ...options, })
  }
}

export default Api
