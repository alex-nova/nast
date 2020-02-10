
/**
 *
 */
export default class StoreInterface {
  /**
   * @param {Vue} Vue
   * @param {Object} stores
   * @return {Store}
   */
  coreInitStore(Vue, stores) {
    return {}
  }
  
  /**
   * Example: 'some.nested.module.count'
   * @param {String} name
   * @return {*}
   */
  state(name) {
    return {}
  }
  
  /**
   * Example: 'some.nested.module.doneTodosCount'
   * @param {String} name
   * @return {*}
   */
  getter(name) {
    return {}
  }
  
  /**
   * @param {String} name
   * @param {*} payload
   * @return {*}
   */
  mutation(name, payload) {
    return {}
  }
  
  /**
   * @param {String} name
   * @param {*} payload
   * @return {*}
   */
  action(name, payload) {
    return {}
  }
}
