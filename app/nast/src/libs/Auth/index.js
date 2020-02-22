import AuthInterface from './../../interfaces/libs/Auth'

/**
 *
 */
class Auth extends AuthInterface {
  /** @var {StoreInterface} */
  _store
  /** @param {ApiInterface} */
  _api
  
  /**
   * @param {StoreInterface} store
   * @param {ApiInterface} api
   */
  constructor(store, api) {
    super(store, api)
    
    this._store = store
    this._api = api
  }
  
  /**
   * @return {AuthGlobalInterface}
   */
  installGlobals() {
    return {
      login: (user, token) => this._login(user, token),
      logout: () => this._logout(),
      user: (user) => this._user(user),
      loggedIn: () => this._loggedIn(),
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
        _save: [ 'user', 'token', ],
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
        setUser(state, { user, }) {
          state.user = user
        },
      },
    }
  }
  
  /**
   *
   */
  coreInit() {
    if (this._loggedIn()) {
      this._apiLogin(this._store.getter('auth.token'))
    }
  }
  
  /**
   * @private
   * @param {Object} user
   * @param {String} token
   */
  _login(user, token) {
    this._store.mutation('auth.login', { user, token, })
    this._apiLogin(token)
  }
  
  /**
   * @private
   * @return {boolean}
   */
  _loggedIn() {
    return Boolean(this._store.getter('auth.token'))
  }
  
  /**
   * @private
   */
  _logout() {
    this._store.mutation('auth.logout')
  }
  
  /**
   * @private
   * @param {Object} user
   * @return {Object}
   */
  _user(user) {
    if (user) {
      this._store.mutation('auth.setUser', { user, })
    }
    return this._store.getter('auth.user')
  }
  
  /**
   * @private
   * @param {String} token
   */
  _apiLogin(token) {
    this._api.config({
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  }
}

export default Auth
