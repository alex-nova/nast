
/**
 *
 */
export default class AuthGlobalInterface {
  /**
   * @param {Object} user
   * @param {String} token
   */
  login(user, token) {}
  
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
