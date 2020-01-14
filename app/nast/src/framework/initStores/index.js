import AuthStoreInterface from './../../interfaces/stores/Auth'

export default (libs) => {
  return {
    /** @type {AuthStoreInterface} */
    auth: libs.auth.installStore ? libs.auth.installStore() : AuthStoreInterface,
  }
}
