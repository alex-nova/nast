import { libs as customLibs, routes as customRoutes, api as customApi, } from '../framework/userApp'
import Router from './Router'
import Store from './Store'
import Data from './Data'
import Api from './Api'
import Auth from './Auth'
import Form from './Form'
import Date from './Date'

export default () => {
  const libs = {
    Router: customLibs.Router || Router,
    Store: customLibs.Store || Store,
    Data: customLibs.Data || Data,
    Api: customLibs.Api || Api,
    Auth: customLibs.Auth || Auth,
    Form: customLibs.Form || Form,
    Date: customLibs.Date || Date,
  }
  
  const store = new libs.Store()
  const router = new libs.Router(customRoutes)
  const data = new libs.Data(store)
  const api = new libs.Api(customApi, store)
  const auth = new libs.Auth(store, api)
  const form = new libs.Form()
  const date = new libs.Date()
  
  return {
    /** @type {RouterInterface} */
    router,
    /** @type {StoreInterface} */
    store,
    /** @type {DataInterface} */
    data,
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
