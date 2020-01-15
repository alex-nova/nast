import { libs as customLibs, routes as customRoutes, api as customApi, } from '../framework/userApp'
import Pages from './Pages'
import Store from './Store'
import Api from './Api'
import Auth from './Auth'
import Form from './Form'
import Date from './Date'

export default () => {
  const libs = {
    Pages: customLibs.Pages || Pages,
    Store: customLibs.Store || Store,
    Api: customLibs.Api || Api,
    Auth: customLibs.Auth || Auth,
    Form: customLibs.Form || Form,
    Date: customLibs.Date || Date,
  }
  
  const store = new libs.Store()
  const pages = new libs.Pages(customRoutes)
  const api = new libs.Api(customApi, store)
  const auth = new libs.Auth(store, api)
  const form = new libs.Form()
  const date = new libs.Date()
  
  return {
    /** @type {PagesInterface} */
    pages,
    /** @type {StoreInterface} */
    store,
    /** @type {ApiInterface} */
    api,
    /** @type {AuthInterface} */
    auth,
    /** @type {FormInterface} */
    form,
    /** @type {DateInterface} */
    date,
  }
}
