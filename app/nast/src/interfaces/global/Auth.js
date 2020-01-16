
/**
 *
 */
export default class AuthGlobalInterface {
  /**
   * @param {String} username
   * @param {String} password
   * @return {Promise}
   */
  login(username, password) {
    return new Promise(() => {})
  }
  
  /**
   *
   */
  logout() {
  
  }
  
  /**
   * @return {Object}
   */
  user() {
    return {}
  }
  
  /**
   * @return {boolean}
   */
  loggedIn() {
    return false
  }
}
