import StoreInterface from './../../interfaces/libs/Store'
import patchStore from './patch'

/**
 *
 */
class Store extends StoreInterface {
  /**
   * @param {Object} Vuex
   */
  corePatchStore(Vuex) {
    patchStore(Vuex)
  }
}

export default Store
