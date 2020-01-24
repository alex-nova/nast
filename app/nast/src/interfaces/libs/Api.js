
/**
 *
 */
export default class ApiInterface {
  /**
   * @param {Object} userApi
   * @param {StoreInterface} store
   */
  constructor(userApi, store) { }
  
  /**
   * @return {ApiGlobalInterface}
   */
  installGlobals() {
    return {}
  }
  
  /**
   * @return {CustomApi}
   */
  coreInitApi() {
    return {}
  }
  
  /**
   * @return {Object}
   */
  coreInitModels() {
    return {}
  }
  
  /**
   * @param {ApiConfigInterface} config
   * @param {String} name
   */
  config(config, name = 'default') {}
}
