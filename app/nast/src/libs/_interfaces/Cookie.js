/**
 *
 */
export default class CookieInterface {
  /**
   * @param {string?} key
   * @param {*?} def Default value.
   * @return {* | string[]}
   */
  get(key = undefined, def = undefined) {
    return [ '', ]
  }
  
  /**
   * @param {string} key
   * @param {*} value
   * @param {object?} options
   * @return {boolean} If set is success
   */
  set(key, value, options = undefined) {
    return false
  }
  
  /**
   * @param {string?} key
   */
  remove(key = undefined) {}
}
