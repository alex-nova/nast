
/**
 *
 */
export default class ApiConfigInterface {
  /**
   * It will be prepended to `url` unless `url` is absolute.
   * @type {string}
   */
  baseUrl = ''
  
  /**
   * If true, `v1/` will prepended to `url`.
   * @type {boolean}
   */
  useVersion = true
  
  /**
   * Example: { 'X-Requested-With': 'XMLHttpRequest', }.
   * @type {Object}
   */
  headers = {}
  
  /**
   * The number of milliseconds before the request times out.
   * @type {number}
   */
  timeout = 0
  
  /**
   * Indicates the type of data that the server will respond with options are:
   * 'arraybuffer', 'document', 'json', 'text', 'stream', 'blob' (browser only).
   * @type {string}
   */
  responseType = 'json'
  
  /**
   * The name of the cookie to use as a value for xsrf token.
   * @type {string}
   */
  xsrfCookieName = 'XSRF-TOKEN'
  
  /**
   * The name of the http header that carries the xsrf token value.
   * @type {string}
   */
  xsrfHeaderName = 'X-XSRF-TOKEN'
  
  /**
   * The max size of the http response content in bytes allowed.
   * @type {number}
   */
  maxContentLength = 2000
  
  /**
   * If returns `true` (or is set to `null` or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
   * @param {Integer} status
   * @return {boolean}
   */
  validateStatus = (status) => {
    return status >= 200 && status < 300
  }
}
