import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import RouterInterface from './../../interfaces/libs/Router'

/**
 *
 */
class Router extends RouterInterface {
  /**
   * @type {Array}
   */
  _routes = []
  /**
   * @type {{'pageName': RouterPageInterface}}
   */
  _pages = {}
  
  /**
   * @param {Array} routes
   */
  constructor(routes) {
    super(routes)
    this._routes = routes
    
    this._pages = $n.reduceDeep(this._routes, (result, item) => {
      if (item.name) {
        result[item.name] = {
          name: item.name,
          route: item.name,
          parent: item.parent || null,
          icon: item.icon || null,
        }
      }
      return result
    }, {})
  }
  
  /**
   * @return {RouterGlobalInterface}
   */
  installGlobals() {
    return {
      getPage: (name) => this.getPage(name),
      breadcrumbs: (name, titles) => this.breadcrumbs(name, titles),
      navigation: (values, titles) => this.navigation(values, titles),
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
      routes: this._routes,
    }
  
    Vue.use(VueRouter)
    return new VueRouter(config)
  }
  
  /**
   * @param {String} name
   * @return {{'pageName': RouterPageInterface} | RouterPageInterface}
   */
  getPage(name = undefined) {
    if (name) {
      return this._pages[name]
    }
    
    return this._pages
  }
  
  /**
   * @param {String} name
   * @param {Object} titles  { name: 'Title', name2: 'Title2', }
   * @return {RouterPageInterface[]}
   */
  breadcrumbs(name, titles = []) {
    const result = []
    let item
    let n = name
    while (n) {
      item = this._pages[n]
      result.push({
        ...item,
        title: this.getTitle(item, titles, 'page'),
      })
      n = item.parent
    }
    return result.reverse()
  }
  
  /**
   * @param {Object} values Example: [ { name*: 'index', children: '', title: '', icon: '', }, ]
   * @param {Object} titles  Example: { name: 'Title', name2: 'Title2', }
   * @return {Object[]}  Example: [ { title: 'Index Page', icon: 'home', route: 'index', children: [...], }, ]
   */
  navigation(values, titles = {}) {
    const reducer = (result, item) => {
      const page = this.getPage(item.name) || item
      const resultItem = {
        name: item.name,
        title: item.title || this.getTitle(page, titles, 'nav'),
        route: item.route || page.route,
        icon: item.icon || page.icon,
      }
      if (item.children) {
        resultItem.children = item.children.reduce(reducer, [])
      }
    
      result.push(resultItem)
      return result
    }
  
    return values.reduce(reducer, [])
  }
  
  /**
   * @param {RouterPageInterface} page
   * @param {Object} titles  { name: 'Title', name2: 'Title2', }
   * @param {String} type  page or nav
   * @return {String}
   */
  getTitle(page, titles, type = 'page') {
    const config = type === 'nav' ? 'navLocaleKey' : 'pageLocaleKey'
    return $n.get(titles, page.name, '') || ($n.isFunction(__) ? __($config(`router.${config}`)(page.name)) : page.name)
  }
}

export default Router
