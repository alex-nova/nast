
export default (libs) => {
  // const { cookie, date, session, storage, api, } = libs
  const { locale, } = libs
  
  global.$app = {
    /** @type {LocaleGlobalInterface} */
    locale,
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
