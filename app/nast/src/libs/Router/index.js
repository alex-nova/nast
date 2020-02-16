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
   * @type {Object}
   */
  _titles = {}
  
  
  /**
   * @param {Array} routes
   */
  constructor(routes) {
    super(routes)
    this._routes = routes
    this._titles = $config('router.titles')()
    
    this._pages = $n.reduceDeep(this._routes, (result, item) => {
      if (item.name) {
        result[item.name] = {
          title: this._getTitle(item),
          name: item.name,
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
      setPage: (name, params = undefined) => this._setPage(name, params),
      current: () => this._getCurrent(),
      breadcrumbs: (settings) => this._getParents(settings),
      navigation: (values) => this._navigation(values),
    }
  }
  
  /**
   * @return {Object}
   */
  installStore() {
    return {
      namespaced: true,
      state: {
        data: {
          // 'index': {
          //   page: {},
          //   parents: {},
          // },
        },
      },
      getters: {
        get: (state) => (name) => $n.get(state['data'], name, {}),
      },
      mutations: {
        setPage: (state, { name, data, }) => {
          state['data'] = {
            ...state['data'],
            [name]: {
              ...$n.get(state['data'], name, {}),
              page: data,
            },
          }
        },
        setParent: (state, { name, parentName, data, }) => {
          const val = $n.get(state['data'], name, {})
          state['data'] = {
            ...state['data'],
            [name]: {
              ...val,
              parents: {
                ...$n.get(val, 'parents', {}),
                [parentName]: data,
              },
            },
          }
        },
      },
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
   * Usage examples: ({ data: {}, }) or ('index', { data: {}, })
   * If params count = 1, name = this route
   * @param {String|Object} name
   * @param {Object} params
   * @private
   */
  _setPage(name, params = undefined) {
    const thisName = $app.store.state('route.name')
    let parentName = name
    let thisParams = params
    if (!params) {
      parentName = thisName
      thisParams = name
    }
    if (thisName === parentName) {
      $app.store.mutation('router.setPage', { name: thisName, data: thisParams, })
    } else {
      $app.store.mutation('router.setParent', { name: thisName, parentName, data: thisParams, })
    }
  }
  
  /**
   * @return {RouterPageInterface}
   * @private
   */
  _getCurrent() {
    const name = $app.store.state('route.name')
    const data = $app.store.getter('router.get')(name)
    return {
      ...this._pages[name],
      ...data,
    }
  }
  
  /**
   * @param {Object} settings  { name: () => {}, }
   * @return {RouterPageInterface[]}
   * @private
   */
  _getParents(settings = []) {
    let name = $app.store.state('route.name')
    const custom = $app.store.getter('router.get')(name)
    const result = []
    let item
    while (name) {
      item = this._pages[name]
      const customItem = $n.get(custom['parents'], name, {})
      const settingsItem = $n.get(settings, name, (d) => ({}))({ ...item, data: customItem.data || {}, })
      result.push({
        ...item,
        route: item.name,
        ...settingsItem,
        ...customItem,
        title: this._getTitle(item, 'breadcrumbs', customItem['title'] || settingsItem['title'], customItem['data'] || settingsItem['data']),
      })
      name = item.parent
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
      const page = $n.get(this._pages, item.name, item)
      const resultItem = {
        name: page.name,
        route: item.children ? '' : page.name,
        title: this._getTitle(page, 'navigation', item.title),
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
   * @param {String} type
   * @param {String} rewrite
   * @param {Object} data
   * @return {String}
   * @private
   */
  _getTitle(page, type = '', rewrite = '', data = {}) {
    if (rewrite) {
      return this._translate(rewrite, data)
    }
    let value = ''
    if (type) {
      const title = $config('router.pageTitle')(page.name, type)
      value = this._translate(title, data)
      if (value === title) {
        const titleP = $config('router.pageTitle')(page.name, 'pages')
        value = this._translate(titleP, data)
        if (value === titleP) {
          return title
        }
      }
      return value
    }
    return this._translate($config('router.pageTitle')(page.name, 'pages'), data)
  }
  
  /**
   * @param {String} name
   * @param {Object} data
   * @return {*}
   * @private
   */
  _translate(name, data = {}) {
    if ($n.size(this._titles)) {
      return $n.get(this._titles, name, name)
    }
    return ($n.isFunction(__) ? __(name, data) : name)
  }
}

export default Router
