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
  
  _titles = {}
  
  /**
   * @param {Array} routes
   */
  constructor(routes) {
    super(routes)
    this._routes = routes
    this._titles = $config('router.titles')
    
    this._pages = $n.reduceDeep(this._routes, (result, item) => {
      if (item.name) {
        result[item.name] = {
          title: this._getTitle(item),
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
      getPage: (name) => this._getPage(name),
      breadcrumbs: (name, titles) => this._breadcrumbs(name, titles),
      navigation: (values) => this._navigation(values),
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
   * @private
   */
  _getPage(name = undefined) {
    if (name) {
      return this._pages[name]
    }
    return this._pages
  }
  
  /**
   * @param {String} name
   * @param {Object} titles  { name: 'Title', name2: 'Title2', }
   * @return {RouterPageInterface[]}
   * @private
   */
  _breadcrumbs(name, titles = []) {
    const result = []
    let item
    let n = name
    while (n) {
      item = this._pages[n]
      result.push({
        ...item,
        title: $n.get(titles, name, this._getTitle(item, 'breadcrumbs')),
      })
      n = item.parent
    }
    return result.reverse()
  }
  
  /**
   * @param {Object} values Example: [ { name*: 'index', title: '', icon: '', children: '', }, ]
   * @return {Object[]}  Example: [ { title: 'Index Page', icon: 'home', route: 'index', children: [...], }, ]
   * @private
   */
  _navigation(values) {
    const reducer = (result, item) => {
      const page = this._getPage(item.name) || item
      const resultItem = {
        name: page.name,
        route: page.route,
        title: item.title || this._getTitle(page, 'nav'),
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
   * @param {String} type  page or nav or breadcrumbs
   * @return {String}
   * @private
   */
  _getTitle(page, type = 'page') {
    return $n.get(this._titles, page.name, '') || ($n.isFunction(__) ? __($config(`router.${type}LocaleKey`)(page.name)) : page.name)
  }
}

export default Router
