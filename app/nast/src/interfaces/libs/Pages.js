
/**
 *
 */
export default class PagesInterface {
  /**
   * @property {Array}
   */
  routes
  
  /**
   * @param {Array} routes
   */
  constructor(routes) {}
  
  /**
   * @param {Vue} Vue
   * @return {RouterOptions} options to new Router(options)
   */
  coreInitRouter(Vue) {
    return {}
  }
}
