/**
 *
 */
export default class StorageInterface {
  /**
   * @param {string?} key
   * @param {*?} def Default value
   * @return {Promise<*>}
   */
  get(key = undefined, def = undefined) {
    return new Promise((r) => r())
  }
  
  /**
   * @param {string} key
   * @param {string} value
   * @return {Promise<*>}
   */
  set(key, value) {
    return new Promise((r) => r())
  }
  
  /**
   * @param {string?} key
   * @return {Promise<void>}
   */
  remove(key = undefined) {
    return new Promise((r) => r())
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
  config(options) {}
}
