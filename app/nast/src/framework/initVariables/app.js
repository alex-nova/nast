import PagesGlobalInterface from './../../interfaces/global/Pages'
import ApiGlobalInterface from './../../interfaces/global/Api'

export default (libs) => {
  global.$app = {
    /** @type {PagesGlobalInterface} */
    pages: libs.pages.installGlobals ? libs.pages.installGlobals() : new PagesGlobalInterface(),
    /** @type {ApiGlobalInterface} */
    api: libs.pages.installGlobals ? libs.api.installGlobals() : new ApiGlobalInterface(),
    // /** @type {ApiInterface} */
    // api,
    // /** @type {CookieInterface} */
    // cookie,
    // /** @type {DateInterface.get} */
    // date: date.get(),
    // /** @type {SessionInterface} */
    // session,
    // /** @type {StorageInterface} */
    // storage,
  }
}
