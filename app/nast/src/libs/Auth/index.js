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
      login: (username, password) => this._login(username, password),
      logout: () => this._logout(),
      user: () => this._user(),
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
   * @param {String} username
   * @param {String} password
   * @return {Promise}
   */
  _login(username, password) {
    return $config('auth.api')(username, password).then((response) => {
      const token = $config('auth.getToken')(response)
      const user = $config('auth.getUser')(response)
      
      this._store.mutation('auth.login', { user, token, })
      this._apiLogin(token)
      
      return response
    })
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
   * @return {Object}
   */
  _user() {
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
