import config from '../../config'


export default (libs) => {
  const { cookie, date, session, storage, api, } = libs
  
  global.$app = {
    /** @type {function} */
    config,
    /** @type {ApiInterface} */
    api,
    /** @type {CookieInterface} */
    cookie,
    /** @type {DateInterface.get} */
    date: date.get(),
    /** @type {SessionInterface} */
    session,
    /** @type {StorageInterface} */
    storage,
  }
}
