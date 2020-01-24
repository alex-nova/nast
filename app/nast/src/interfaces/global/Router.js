/**
 *
 */
export default class RouterGlobalInterface {
  /**
   * @param {String} name
   * @return {{'pageName': RouterPageInterface} | RouterPageInterface}
   */
  getPage(name = '') {
    return {}
  }
  
  /**
   * @param {String} name
   * @param {Object} titles  { name: 'Title', name2: 'Title2', }
   * @return {RouterPageInterface[]}
   */
  breadcrumbs(name, titles = []) {
    return {}
  }
  
  /**
   * @param {Object} values Example: [ { name*: 'index', children: '', title: '', icon: '', }, ]
   * @param {Object} titles  Example: { name: 'Title', name2: 'Title2', }
   * @return {Object[]}  Example: [ { title: 'Index Page', icon: 'home', route: 'index', children: [...], }, ]
   */
  navigation(values, titles = {}) {
    return {}
  }
}
