/**
 *
 */
export default class RouterGlobalInterface {
  /**
   * @return {RouterPageInterface}
   */
  current() {
    return {}
  }
  
  /**
   * Usage examples: ({ data: {}, }) or ('index', { data: {}, })
   * If params count = 1, name = this route
   * @param {String|Object} name
   * @param {Object} params
   */
  _setPage(name, params = undefined) {}
  
  /**
   * @param {Object} settings  { name: () => {}, }
   * @return {RouterPageInterface[]}
   */
  breadcrumbs(settings = []) {
    return {}
  }
  
  /**
   * @param {Object} values Example: [ { name*: 'index', title: '', icon: '', children: '', }, ]
   * @return {Object[]}  Example: [ { title: 'Index Page', icon: 'home', route: 'index', children: [...], }, ]
   */
  navigation(values) {
    return {}
  }
}