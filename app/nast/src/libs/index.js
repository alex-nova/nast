import { libs as customLibs, routes, store as customStores, } from '../framework/userApp'
import Pages from './Pages'
import Store from './Store'
import Api from './Api'


export default () => {
  const libs = {
    Pages: customLibs.Pages || Pages,
    Store: customLibs.Store || Store,
    Api: customLibs.Api || Api,
  }
  
  const pages = new libs.Pages(routes)
  const store = new libs.Store(customStores)
  const api = new libs.Api(customStores)
  
  return {
    /** @type {PagesInterface} */
    pages,
    /** @type {StoreInterface} */
    store,
    /** @type {ApiInterface} */
    api,
  }
}
