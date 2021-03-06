import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import StoreInterface from './../../interfaces/libs/Store'
import patchStore from './patch'

/**
 *
 */
class Store extends StoreInterface {
  /**
   * @param {Vuex}
   */
  _vuex
  
  /**
   * @param {Store}
   */
  _instance
  
  /**
   * @param {Object} stores
   */
  constructor(stores) {
    super()
    
    this._vuex = Vuex
  }
  
  /**
   *
   * @return {StoreGlobalInterface}
   */
  installGlobals() {
    return {
      state: (name) => this.state(name),
      getter: (name) => this.getter(name),
      mutation: (name, payload) => this.mutation(name, payload),
      action: (name, payload) => this.action(name, payload),
      mapState: (namespace, mapper = undefined) => this.mapState(namespace, mapper),
      mapGetters: (namespace, mapper = undefined) => this.mapGetters(namespace, mapper),
      mapMutations: (namespace, mapper = undefined) => this.mapMutations(namespace, mapper),
      mapActions: (namespace, mapper = undefined) => this.mapActions(namespace, mapper),
    }
  }
  
  /**
   * @param {Vue} Vue
   * @param {Object} stores
   * @return {Store}
   */
  coreInitStore(Vue, stores) {
    patchStore(this._vuex)
    Vue.use(this._vuex)
    
    const vuexLocal = new VuexPersistence({
      storage: window.localStorage,
    })
    
    const instance = new this._vuex.Store({
      modules: {
        ...stores,
      },
      plugins: [ vuexLocal.plugin, ],
    })
    
    this._instance = instance
    
    return instance
  }
  
  /**
   * Example: 'some.nested.module.count'
   * @param {String} name
   * @return {*}
   */
  state(name) {
    return $n.get(this._instance.state, name)
  }
  
  /**
   * Example: 'some.nested.module.doneTodosCount'
   * @param {String} name
   * @return {*}
   */
  getter(name) {
    return $n.get(this._instance.getters, name.split('.').join('/'))
  }
  
  /**
   * @param {String} name
   * @param {*} payload
   * @return {*}
   */
  mutation(name, payload) {
    return this._instance.commit(name.split('.').join('/'), payload)
  }
  
  /**
   * @param {String} name
   * @param {*} payload
   * @return {*}
   */
  action(name, payload) {
    return this._instance.dispatch(name.split('.').join('/'), payload)
  }
  
  /**
   * Example:
   * 'some/nested/module'
   * @param {String} namespace Not required.
   *
   * Example:
   * {
   *   count: (state) => state.count,
   *   countAlias: 'count',
   *   countPlusLocalState(state) {
   *     return state.count + this.localCount
   *   },
   * }
   * OR
   * [ 'count', ]
   * @param {Object|Array} mapper
   * @return {Object}
   */
  mapState(namespace, mapper = undefined) {
    return this._vuex.mapState(namespace, mapper)
  }
  
  /**
   * Example:
   * 'some/nested/module'
   * @param {String} namespace Not required.
   *
   * Example:
   * { doneCount: 'doneTodosCount', }
   * OR
   * [ 'doneTodosCount', ]
   * @param {Object|Array} mapper
   * @return {Object}
   */
  mapGetters(namespace = undefined, mapper) {
    return this._vuex.mapGetters(namespace, mapper)
  }
  
  /**
   * Example:
   * 'some/nested/module'
   * @param {String} namespace Not required.
   *
   * Example:
   * { add: 'increment', }
   * OR
   * [ 'increment', ]
   * @param {Object|Array} mapper
   * @return {Object}
   */
  mapMutations(namespace = undefined, mapper) {
    return this._vuex.mapMutations(namespace, mapper)
  }
  
  /**
   * Example:
   * 'some/nested/module'
   * @param {String} namespace Not required.
   *
   * Example:
   * { add: 'increment', }
   * OR
   * [ 'increment', ]
   * @param {Object|Array} mapper
   * @return {Object}
   */
  mapActions(namespace = undefined, mapper) {
    return this._vuex.mapActions(namespace)
  }
}

export default Store
