import cookieUniversal from 'cookie-universal/types'
import BaseCookie from '../_interfaces/Cookie'


/**
 *
 */
class Cookie extends BaseCookie {
  instance = {}
  
  /**
   *
   */
  constructor() {
    super()
    
    this.instance = cookieUniversal()
  }
  
  
  /**
   *
   * @param {string?} key
   * @param {*?} def Default value.
   * @return {* | string[]}
   */
  get(key = undefined, def = undefined) {
    if (key !== undefined) {
      const value = this.instance.get(key)
      
      return value !== undefined ? value : def
    }
    
    return this.instance.getAll()
  }
  
  /**
   * @param {string} key
   * @param {*} value
   * @param {object?} options
   * @return {boolean} If set is success
   */
  set(key, value, options = undefined) {
    try {
      this.instance.set(key, value, options)
      return true
    } catch (e) {
      return false
    }
  }
  
  /**
   * @param {string?} key
   */
  remove(key = undefined) {
    if (key !== undefined) {
      this.instance.remove(key)
    }
    
    this.instance.removeAll()
  }
}

export default Cookie
