import Router from 'vue-router'
import Meta from 'vue-meta'
import PagesInterface from './../../interfaces/libs/Pages'

/**
 *
 */
class Pages extends PagesInterface {
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
          route: item.name,
          parent: item.parent || null,
          icon: item.icon || null,
          title: __(`app.pages.${item.name}`),
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
   * @param {Vue} Vue
   * @return {VueRouter}
   */
  coreInitRouter(Vue) {
    // TODO разобраться в конфиге
    Vue.use(Meta, {
      keyName: 'html',
      attribute: 'dv-meta',
      ssrAttribute: 'dv-meta-server-rendered',
      tagIDKeyName: 'mid',
    })
    
    const config = {
      base: $env.prod ? $config('app.baseUrl') : '/',
      mode: 'history',
      fallback: false,
      routes: this.routes,
    }
  
    Vue.use(Router)
    return new Router(config)
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
}

export default Pages
