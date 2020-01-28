/**
 *
 */
export default class RouterGlobalInterface {
  /**
   * @param {String} name
   * @return {{'pageName': RouterPageInterface} | RouterPageInterface}
   */
  getPage(name = undefined) {
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
   * @param {Object} values Example: [ { name*: 'index', title: '', icon: '', children: '', }, ]
   * @return {Object[]}  Example: [ { title: 'Index Page', icon: 'home', route: 'index', children: [...], }, ]
   */
  navigation(values) {
    return {}
  }
}
