
/**
 *
 */
export default class StoreGlobalInterface {
  /**
   * Example: 'some.nested.module.count'
   * @param {String} name
   * @return {*}
   */
  state(name) {
    return {}
  }
  
  /**
   * Example: 'some.nested.module.doneTodosCount'
   * @param {String} name
   * @return {*}
   */
  getter(name) {
    return {}
  }
  
  /**
   * @param {String} name
   * @param {*} payload
   * @return {*}
   */
  mutation(name, payload) {
    return {}
  }
  
  /**
   * @param {String} name
   * @param {*} payload
   * @return {*}
   */
  action(name, payload) {
    return {}
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
    return {}
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
    return {}
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
    return {}
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
    return {}
  }
}
