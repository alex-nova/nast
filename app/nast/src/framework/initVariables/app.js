import PagesGlobalInterface from './../../interfaces/global/Pages'

export default (libs) => {
  global.$app = {
    /** @type {PagesGlobalInterface} */
    pages: libs.pages.installGlobals ? libs.pages.installGlobals() : new PagesGlobalInterface(),
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
