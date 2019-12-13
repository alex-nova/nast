/**
 *
 */
export default class ApiInterface {
  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {object} params
   * @param {object} options TODO
   * @param {string} server
   */
  request(method, url, params, options, server = 'default') {}
}
