
/**
 *
 */
export default class AuthInterface {
  /**
   * @param {StoreInterface} store
   * @param {ApiInterface} api
   */
  constructor(store, api) {}
  
  /**
   * @return {AuthGlobalInterface}
   */
  installGlobals() {
    return {}
  }
  
  /**
   * @return {AuthStoreInterface}
   */
  installStore() {
    return {}
  }
  
  /**
   *
   */
  coreInit() {}
}
