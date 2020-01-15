import AuthInterface from './../../interfaces/libs/Auth'

/**
 *
 */
class Auth extends AuthInterface {
  /**
   * @param {StoreInterface}
   */
  _store
  
  /**
   * @param {ApiInterface}
   */
  _api
  
  /**
   * @param {StoreInterface} store
   * @param {ApiInterface} api
   */
  constructor(store, api) {
    super(store, api)
    
    this._store = store
    this._api = api
    
    // TODO eq
    setTimeout(() => {
      if (this.loggedIn()) {
        this.apiLogin(this._store.getter('auth.token'))
      }
    }, 100)
  }
  
  /**
   *
   * @return {AuthGlobalInterface}
   */
  installGlobals() {
    return {
      login: (username, password) => this.login(username, password),
      logout: () => this.logout(),
      user: () => this.user(),
      loggedIn: () => this.loggedIn(),
    }
  }
  
  /**
   * @return {AuthStoreInterface}
   */
  installStore() {
    return {
      namespaced: true,
      state: {
        user: null,
        token: '',
      },
      getters: {
        user: (state) => {
          return state.user
        },
        token: (state) => {
          return state.token
        },
      },
      mutations: {
        login(state, { user, token, }) {
          state.user = user
          state.token = token
        },
        logout(state) {
          state.user = null
          state.token = ''
        },
      },
    }
  }
  
  /**
   * @param {String} username
   * @param {String} password
   * @return {Promise}
   */
  login(username, password) {
    return $config('auth.api')(username, password).then((response) => {
      const token = $config('auth.getToken')(response)
      const user = $config('auth.getUser')(response)
  
      this._store.mutation('auth.login', { user, token, })
      this.apiLogin(token)
      
      return response
    })
  }
  
  /**
   * @return {boolean}
   */
  loggedIn() {
    return Boolean(this._store.getter('auth.token'))
  }
  
  /**
   *
   */
  logout() {
    this._store.mutation('auth.logout')
  }
  
  /**
   * @return {Object}
   */
  user() {
    return this._store.getter('auth.user')
  }
  
  /**
   * @param {String} token
   */
  apiLogin(token) {
    this._api.config({
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  }
}

export default Auth
