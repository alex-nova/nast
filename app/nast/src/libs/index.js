import { libs as customLibs, } from '../framework/userApp'
import Pages from './Pages'
import Store from './Store'


const libs = {
  Pages: customLibs.Pages || Pages,
  Store: customLibs.Store || Store,
}

const pages = new libs.Pages()
const store = new libs.Store()


export default {
  /** @type {PagesInterface} */
  pages,
  /** @type {StoreInterface} */
  store,
}
