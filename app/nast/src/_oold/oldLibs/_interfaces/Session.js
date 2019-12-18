/**
 *
 */
export default class SessionInterface {
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
   */
  set(key, value) { }
  
  /**
   * @param {string?} key
   */
  remove(key = undefined) {}
}
