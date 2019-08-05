import apiStore from './api'
import contentStore from './content'
import authStore from './auth'


export default {
  init(store) {
    store.registerModule('api', apiStore)
    store.registerModule([ 'api', 'content', ], contentStore)
    store.registerModule([ 'api', 'auth', ], authStore)
  },
}
