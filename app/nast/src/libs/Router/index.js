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
  
  /** { name: { custom: 'data', }, } */
  _customData = {}
  
  
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
      set: (params) => this._setData(params),
      setParent: (name, params) => this._setParent(name, params),
      current: () => this._getCurrent(),
      breadcrumbs: (settings) => this._getParents(settings),
      navigation: (values) => this._navigation(values),
    }
  }
  
  installStore() {
    return {
      namespaced: true,
      state: {
        data: {
          // 'index': {},
        },
      },
      getters: {
        get: (state) => (name) => $n.get(state['data'], name, {}),
      },
      mutations: {
        setData: (state, { name, data, }) => {
          state['data'] = {
            ...state['data'],
            [name]: {
              ...$n.get(state['data'], name, {}),
              data,
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
   * @param {Object} data
   * @private
   */
  _setData(data = {}) {
    const name = $app.store.state('route.name')
    $app.store.mutation('router.setData', { name, data, })
  }
  
  /**
   * @param {String} name
   * @param {Object} data
   * @private
   */
  _setParent(name, data = {}) {
    const pageName = $app.store.state('route.name')
    $app.store.mutation('router.setParent', { name: pageName, parentName: name, data, })
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
      data,
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
      const settingsItem = $n.get(settings, name, (d) => d)({ ...item, data: customItem.data || {}, })
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
        route: page.route,
        title: this._getTitle(page, item.title),
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
    console.log({ page, type, rewrite, data, })
    if (rewrite) {
      return this._translate(rewrite, data)
    }
    let value = ''
    if (type === 'breadcrumbs') {
      value = this._translate($config('router.pageTitle')(page.name, type), data)
      if (value) {
        return value
      }
    } else if (type === 'navigation') {
      value = this._translate($config('router.pageTitle')(page.name, type), data)
      if (value) {
        return value
      }
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
      return $n.get(this._titles, name, '')
    }
    return ($n.isFunction(__) ? __(name, data) : name)
  }
}

export default Router
