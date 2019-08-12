import localforage from 'localforage'
import BaseStorage from './../_interfaces/Storage'


/**
 *
 */
class Storage extends BaseStorage {
  /**
   *
   */
  instance
  
  /**
   *
   */
  constructor() {
    super()
    
    this.instance = localforage
  }
  
  /**
   * @param {string?} key
   * @param {*?} def Default value
   * @return {Promise<*>}
   */
  get(key = undefined, def = undefined) {
    if (key !== undefined) {
      return this.instance.getItem(key).then((v) => (v === undefined) ? def : v)
    }
  
    return this.instance.keys().then((keys) => {
      const promises = $n.reduce(keys, (result, key) => {
        result[key] = this.get(key)
        return result
      }, {})
    
      return $n.objectPromiseAll(promises)
    })
  }
  
  /**
   * @param {string} key
   * @param {string} value
   * @return {Promise<*>}
   */
  set(key, value) {
    return this.instance.setItem(key, value)
  }
  
  /**
   * @param {string?} key
   * @return {Promise<void>}
   */
  remove(key = undefined) {
    return this.instance.removeItem(key)
  }
  
  /**
   * @param {object} options
   * @param {string} options.name
   * @param {string} options.storeName
   * @param {string} options.driver
   * @param {number} options.size
   * @param {number} options.version
   * @param {string} options.driver
   */
  config(options) {
    this.instance.config(options)
  }
}

export default Storage
