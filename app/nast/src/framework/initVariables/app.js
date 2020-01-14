import PagesGlobalInterface from './../../interfaces/global/Pages'
import ApiGlobalInterface from './../../interfaces/global/Api'
import StoreGlobalInterface from './../../interfaces/global/Store'
import AuthGlobalInterface from './../../interfaces/global/Auth'
import DateGlobalInterface from './../../interfaces/global/Date'

export default (libs) => {
  global.$app = {
    /** @type {PagesGlobalInterface} */
    pages: libs.pages.installGlobals ? libs.pages.installGlobals() : new PagesGlobalInterface(),
    /** @type {StoreGlobalInterface} */
    store: libs.store.installGlobals ? libs.store.installGlobals() : new StoreGlobalInterface(),
    /** @type {ApiGlobalInterface} */
    api: libs.api.installGlobals ? libs.api.installGlobals() : new ApiGlobalInterface(),
    /** @type {AuthGlobalInterface} */
    auth: libs.auth.installGlobals ? libs.auth.installGlobals() : new AuthGlobalInterface(),
    /** @type {DateGlobalInterface} */
    date: libs.date.installGlobals ? libs.date.installGlobals() : new DateGlobalInterface(),
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
