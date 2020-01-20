
/**
 *
 */
export default class RouterInterface {
  /**
   * @property {Array}
   */
  routes
  
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
   * @param {Vue} Vue
   * @return {VueRouter}
   */
  coreInitRouter(Vue) {
    return {}
  }
}
