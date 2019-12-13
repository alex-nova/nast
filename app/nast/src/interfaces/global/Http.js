/**
 *
 */
export default class HttpInterface {
  /**
   * @param {string} method
   * @param {string} url
   * @param {object?} params
   * @param {object?} options
   * @return {Promise<*>}
   */
  send(method, url, params, options = {}) {
    return new Promise(() => {})
  }
  
  /**
   * @param {string} baseUrl
   */
  setBaseUrl(baseUrl) {}
  
  /**
   * @param {object} headers { header1: 'value1', }
   */
  setHeaders(headers) {}
}
