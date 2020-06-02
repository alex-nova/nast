import DataInterface from './../../interfaces/libs/Data'

/**
 *
 */
class Data extends DataInterface {
  /** @var {StoreInterface} */
  _store
  
  /**
   * @param {StoreInterface} store
   */
  constructor(store) {
    super(store)
    this._store = store
  }
  
  /**
   * @return {Object}
   */
  installMixin() {
    const get = (name, component) => this._getData(name, component)
    const getPromise = this._getPromise
    const outdateTag = (tag) => this._outdateTag(tag)
    
    return {
      computed: {
        $d() {
          const component = this.$options.name
          const vars = this.$options.load ? this.$options.load(this.$route) : {}
          
          return {
            get: (name) => get(name, component).data,
            loading: (name) => get(name, component).loading,
            reload: (name) => {
              if (vars[name]) getPromise(name, component, vars[name]).then()
            },
            reloadTag: (tag) => outdateTag(tag),
            comp: (name) => {},
          }
        },
      },
      watch: {
        '$route'(route) {
          if (this.$options.load) {
            const component = this.$options.name
            $n.each(this.$options.load(this.$router), (value, name) => {
              if (!get(name, component).loadedAt) {
                this.$d.reload(name)
              }
            })
          }
        },
      },
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
          // variable_Component: {
          //   data: [],
          //   loading: false,
          //   loadedAt: 192232323000,
          //   lifetime: 60*60,
          //   tag: 'tagName',
          //   def: {},
          // },
        },
      },
      getters: {
        get: (state) => (name, component) => $n.get(state['data'], this._getDataKey(name, component), this._getDataItem()),
      },
      mutations: {
        startLoad: (state, { name, component, def, tag, lifetime, }) => {
          state['data'] = {
            ...state['data'],
            [this._getDataKey(name, component)]: this._getDataItem({ data: def, loading: true, def, tag, lifetime, }),
          }
        },
        update: (state, { name, component, data, }) => {
          state['data'][this._getDataKey(name, component)] = {
            ...$n.get(state['data'], this._getDataKey(name, component)),
            data,
            loading: false,
            loadedAt: new Date().getTime(),
          }
        },
        error: (state, { name, component, }) => {
          state['data'][this._getDataKey(name, component)] = {
            ...$n.get(state['data'], this._getDataKey(name, component)),
            data: $n.get(state['data'], `${this._getDataKey(name, component)}.def`),
            loading: false,
            loadedAt: 0,
          }
        },
        outdateTag: (state, { tag, }) => {
          $n.each(state['data'], (value, name) => {
            if (value.tag === tag) {
              state['data'][name] = {
                ...$n.get(state['data'], name),
                loadedAt: 0,
              }
            }
          })
        },
      },
    }
  }
  
  /**
   * @param {VueRouter} router
   */
  coreUpdateRouter(router) {
    router.beforeResolve((to, from, next) => {
      this.loadData(router, to, from, next)
    })
  }
  
  /**
   * @param {VueRouter} router
   * @param {Route} to
   * @param {Route} from
   * @param {Function} next
   * @private
   */
  loadData(router, to, from = null, next = () => {}) {
    let components
    if (from) {
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)
      let diffed = false
      components = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c))
      })
    } else {
      components = router.getMatchedComponents(to)
    }
  
    const promises = {}
  
    $n.each(components, (component) => {
      const load = component.load
      if (load) {
        $n.each(load(to), (value, name) => {
          promises[this._getDataKey(name, component.name)] = this._getPromise(name, component.name, value)
        }, {})
      }
    })
  
    if (!$n.size(promises)) {
      next()
      return
    }
  
    const promiseAll = Promise.all(Object.values(promises))
    if ($config('data.preload')) {
      promiseAll.then(() => next()).catch(next)
    } else {
      setTimeout(() => {
        next()
      })
    }
  }
  
  /**
   * @private
   * @param {String} name
   * @param {String} component
   * @return {*}
   */
  _getData(name, component) {
    return this._store.getter('data.get')(name, component)
  }
  
  /**
   * @private
   * @param {String} tag
   * @return {*}
   */
  _outdateTag(tag) {
    return this._store.mutation('data.outdateTag', { tag, })
  }
  
  // /**
  //  * @param {String} name
  //  * @param {*} args
  //  * @return {function(...[*]=)}
  //  */
  // _getFunc(name, args) {
  //   return (params) => {
  //     if (this.getLoading(name, params)) {
  //       return new Promise(((resolve) => resolve(this.getData(name, args))))
  //     } else {
  //       return this.patchApiRequest(this._userData[name](...args), { name, args, }).params(params)
  //     }
  //   }
  // }
  //
  /**
   * @private
   * @param {String} name
   * @param {String} component
   * @param {ApiObject} api
   * @param {*} def
   * @param {String} tag
   * @param {Integer} lifetime
   * @param {Function} callback
   * @return {ApiObject}
   */
  _getPromise(name, component, { api, default: def, tag, lifetime, callback = () => {}, }) {
    return api.before(() => {
      $app.store.mutation('data.startLoad', { name, component, def, tag, lifetime, })
    }).callback((response) => {
      const data = $n.get(response, $config('api.dataKey'))
      $app.store.mutation('data.update', { name, component, data, })
      callback(data)
      return response
    }, '_api.data')
  }
  
  /**
   * @private
   * @param {*} data
   * @param {Boolean} loading
   * @param {Integer} loadedAt
   * @param {Integer} lifetime  in seconds
   * @param {String} tag
   * @param {*} def  default value
   * @return {Object}
   */
  _getDataItem({ data = [], loading = false, loadedAt = 0, lifetime = 0, tag = null, def = {}, } = {}) {
    return {
      data,
      loading,
      loadedAt,
      lifetime,
      tag,
      def,
    }
  }
  
  /**
   * @private
   * @param {String} name
   * @param {String} componentName
   * @return {String}
   */
  _getDataKey(name, componentName) {
    return `${name}_${componentName}`
  }
}

export default Data
