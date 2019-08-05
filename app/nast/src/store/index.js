import Vue from 'vue'
import Vuex from 'vuex'
import { store, } from './../userApp'
import { patchRegisterModule, } from './patch'


patchRegisterModule(Vuex)
Vue.use(Vuex)

/**
 * Create store.
 *
 * @return {Store<*>}
 */
export function createStore() {
  return new Vuex.Store({
    modules: {
      ...store,
    },
  })
}
