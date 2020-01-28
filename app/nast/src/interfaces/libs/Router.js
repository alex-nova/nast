
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
   * @param {Vue} Vue
   * @return {VueRouter}
   */
  coreInitRouter(Vue) {
    return {}
  }
}
