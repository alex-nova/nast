import BaseSession from './../_interfaces/Session'


/**
 *
 */
class Session extends BaseSession {
  /**
   *
   * @param {string?} key
   * @param {*?} def Default value.
   * @return {* | string[]}
   */
  get(key = undefined, def = undefined) {
    try {
      const value = JSON.parse(sessionStorage.getItem(key))
      return value !== null ? value : def
    } catch (e) {
      return def
    }
  }
  
  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  }
  
  /**
   * @param {string?} key
   */
  remove(key = undefined) {
    if (key !== undefined) {
      sessionStorage.removeItem(key)
    }
  
    sessionStorage.clear()
  }
}

export default Session
