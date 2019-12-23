import LocaleInterface from './../../interfaces/libs/Locale'


/**
 *
 */
class Locale extends LocaleInterface {
  /**
   * @type {Array}
   */
  routes = []
  /**
   * @type {{'pageName': PagesPageInterface}}
   */
  pages = {}
  
  
  /**
   * @param {Array} routes
   */
  constructor(routes) {
    super(routes)
    this.routes = routes
    
    this.pages = $n.reduceDeep(this.routes, (result, item) => {
      if (item.name) {
        result[item.name] = {
          name: item.name,
          parent: item.parent || null,
          icon: item.icon || null,
          title: `app.pages.${item.name}`,
        }
      }
      return result
    }, {})
  }
  
  /**
   * @return {PagesGlobalInterface}
   */
  installGlobals() {
    return {
      get: (name) => this.getPage(name),
      breadcrumbs: (name) => this.structureByName(name),
    }
  }
  
  /**
   * @param {String} name
   * @return {{'pageName': PagesPageInterface} | PagesPageInterface}
   */
  getPage(name = undefined) {
    if (name) {
      return this.pages[name]
    }
    
    return this.pages
  }
  
  /**
   * @param {String} name
   * @return {PagesPageInterface[]}
   */
  structureByName(name) {
    const result = []
    let item
    let n = name
    while (n) {
      item = this.pages[n]
      result.push(item)
      n = item.parent
    }
    return result.reverse()
  }
  
  /**
   * @param {Vue} Vue
   * @return {RouterOptions} options to new Router(options)
   */
  // coreTranslate(key, def) {
  //   const translate = $n.get()
  // }
}

export default Locale
