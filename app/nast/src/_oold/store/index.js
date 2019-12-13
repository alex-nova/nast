import Vue from 'vue'
import Vuex from 'vuex'
import { store, } from './../userApp'
import { patchRegisterModule, } from './patch'

/**
 * Create store.
 *
 * @return {Store<*>}
 */
export function createStore() {
  patchRegisterModule(Vuex)
  Vue.use(Vuex)
  
  return new Vuex.Store({
    modules: {
      ...store,
    },
  })
}
