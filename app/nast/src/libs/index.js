import { libs as customLibs, routes, store as customStores, } from '../framework/userApp'
import Pages from './Pages'
import Store from './Store'


export default () => {
  const libs = {
    Pages: customLibs.Pages || Pages,
    Store: customLibs.Store || Store,
  }
  
  const pages = new libs.Pages(routes)
  const store = new libs.Store(customStores)
  
  return {
    /** @type {PagesInterface} */
    pages,
    /** @type {StoreInterface} */
    store,
  }
}
