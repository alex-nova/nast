
/**
 *
 */
export default class ApiGlobalInterface {
  /**
   * @param {String|Array} url
   * @param {String} name  Name of api instance
   * @return {ApiObject}
   */
  get(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name  Name of api instance
   * @return {ApiObject}
   */
  post(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name  Name of api instance
   * @return {ApiObject}
   */
  put(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name  Name of api instance
   * @return {ApiObject}
   */
  patch(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name  Name of api instance
   * @return {ApiObject}
   */
  delete(url, name = '') {
    return {}
  }
  
  /**
   * Config instance
   * @param {ApiConfigInterface} config
   * @param {String} name  Name of api instance
   */
  config(config, name = '') {}
}
