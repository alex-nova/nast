
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
   * @return {Promise}
   */
  logout() {
    return new Promise(() => {})
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
