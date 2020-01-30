
/**
 *
 */
export default class RouterInterface {
  /**
   * @param {Array} routes
   */
  constructor(routes) {}
  
  /**
   * @return {RouterGlobalInterface}
   */
  installGlobals() {
    return {}
  }
  
  /**
   * @return {Object}
   */
  installStore() {
    return {}
  }
  
  /**
   * @param {Vue} Vue
   * @return {VueRouter}
   */
  coreInitRouter(Vue) {
    return {}
  }
}
