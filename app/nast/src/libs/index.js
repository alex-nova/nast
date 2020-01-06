import { libs as customLibs, routes, store as customStores, } from '../framework/userApp'
import Pages from './Pages'
import Store from './Store'
import Api from './Api'
import Form from './Form'


export default () => {
  const libs = {
    Pages: customLibs.Pages || Pages,
    Store: customLibs.Store || Store,
    Api: customLibs.Api || Api,
    Form: customLibs.Form || Form,
  }
  
  const pages = new libs.Pages(routes)
  const store = new libs.Store(customStores)
  const api = new libs.Api(customStores)
  const form = new libs.Form()
  
  return {
    /** @type {PagesInterface} */
    pages,
    /** @type {StoreInterface} */
    store,
    /** @type {ApiInterface} */
    api,
    /** @type {FormInterface} */
    form,
  }
}
