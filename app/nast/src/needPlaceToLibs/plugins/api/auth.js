import StorePluginInterface from '../../StorePluginInterface'
import storeModule from './store/auth'

/**
 *
 */
export default Object.assign({}, StorePluginInterface, {
  http: {},
  
  /**
   *
   * @param {object} store
   * @param {object} http - { setHeaders: ({object} headers) => {}, }
   * @param {string} moduleName
   * @return {init}
   */
  init({ store, http, moduleName = 'api/auth', }) {
    this.http = http
    this.store = store
    this.storeModule = storeModule
    this.moduleName = moduleName
    
    this.register()
    
    return this
  },
  
  /**
   *
   * @param {array} permissions - [ 'can_read', 'can_write' ]
   * @return {boolean}
   */
  can(permissions) {
    return this.getter('can')
  },
  
  updateAuth({ token, user, }) {
    this.commit('setToken', token)
    this.commit('setUser', user)
    this.setAuthHeader(token)
  },
  
  clearAuth() {
    this.setAuthHeader()
    this.commit('setToken', '')
    this.commit('setUser', {})
  },
  
  setAuthHeader(token) {
    if (token) {
      this.http.setHeaders({ 'Authorization': `Bearer ${token}`, })
      $app.cookie.set('auth_token', token)
    } else {
      this.http.setHeaders({ 'Authorization': '', })
      $app.cookie.remove('auth_token')
    }
  },
})
