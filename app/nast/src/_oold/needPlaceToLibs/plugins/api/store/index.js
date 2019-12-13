import apiStore from './api'
import contentStore from './content'
import authStore from './auth'


export default {
  init(store) {
    store.registerModule('index.js', apiStore)
    store.registerModule([ 'index.js', 'content', ], contentStore)
    store.registerModule([ 'index.js', 'auth', ], authStore)
  },
}
