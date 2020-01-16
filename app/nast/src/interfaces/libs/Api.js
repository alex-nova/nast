
/**
 *
 */
export default class ApiInterface {
  /**
   * @param {Object} userApi
   * @param {StoreInterface} store
   */
  constructor(userApi, store) {  }
  
  /**
   * @return {ApiGlobalInterface}
   */
  installGlobals() {
    return {}
  }
  
  /**
   * @return {ApiStoreInterface}
   */
  installStore() {
    return {}
  }
  
  /**
   * @param {Object} router
   */
  coreUpdateRouter(router) {}
  
  /**
   * @return {CustomApi}
   */
  coreInitApi() {
    return {}
  }
  
  /**
   * @return {Object}
   */
  coreInitData() {
    return {}
  }
}
