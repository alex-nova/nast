import ApiStoreInterface from './../../interfaces/stores/Api'
import AuthStoreInterface from './../../interfaces/stores/Auth'

export default (libs) => {
  return {
    /** @type {ApiStoreInterface} */
    api: libs.auth.installStore ? libs.api.installStore() : ApiStoreInterface,
    /** @type {AuthStoreInterface} */
    auth: libs.auth.installStore ? libs.auth.installStore() : AuthStoreInterface,
  }
}
