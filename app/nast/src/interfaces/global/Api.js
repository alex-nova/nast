
/**
 *
 */
export default class ApiGlobalInterface {
  /**
   * @param {String|Array} url
   * @param {String} name
   * @return {ApiObject}
   */
  get(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name
   * @return {ApiObject}
   */
  post(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name
   * @return {ApiObject}
   */
  put(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name
   * @return {ApiObject}
   */
  patch(url, name = '') {
    return {}
  }
  /**
   * @param {String|Array} url
   * @param {String} name
   * @return {ApiObject}
   */
  delete(url, name = '') {
    return {}
  }
  
  /**
   * @param {ApiConfigInterface} config
   */
  config(config) {}
  
  /**
   * @param {String} name
   * @param {ApiConfigInterface} config
   */
  create(name, config) {}
}
