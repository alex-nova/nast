/**
 *
 */
export default class BusInterface {
  /**
   * @param {string} name
   * @param {function} callback
   */
  listen(name, callback) {}
  
  /**
   * @param {string} name
   */
  emit(name) {}
}
