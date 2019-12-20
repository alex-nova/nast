/**
 *
 */
export default class ApiGlobalInterface {
  /**
   * @param {String} name
   * @return {{'pageName': PagesPageInterface} | PagesPageInterface}
   */
  get(name = '') {
    return {}
  }
  
  /**
   * @param {String} name
   * @return {PagesPageInterface[]}
   */
  breadcrumbs(name) {
    return {}
  }
}
