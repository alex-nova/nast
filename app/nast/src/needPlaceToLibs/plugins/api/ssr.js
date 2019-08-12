import apiStore from './store'
import utils from './utils'


export default {
  prefetch(store, api, matchedComponents) {
    apiStore.init(store)
    
    return this.restoreAuth(store, api).then(() => {
      let promises = false
      
      if (api.fetch) {
        promises = matchedComponents.reduce((result, component) => {
          if (component.fetch && $n.isArray(component.fetch)) {
            $n.each(component.fetch, (name) => {
              if (api.fetch[name]) {
                result[name] = utils.fetch(store, { name, ...api.fetch[name], })
              }
            })
          }
          return result
        }, {})
      }
      
      if (promises) {
        return $n.objectPromiseAll(promises)
      }
      
      return new Promise((resolve) => resolve())
    })
  },
  
  restoreAuth(store, api) {
    const token = $app.cookie.get('auth_token')
    if (token) {
      utils.updateAuthHeader(token)
    }
    
    let infoApi = () => new Promise((resolve) => resolve())
    if (token) {
      infoApi = $n.get(api, $app.config('api.authInfoApiName'), infoApi)
    }
    
    return infoApi().then((response) => {
      if (response) {
        return {
          token,
          user: response.data.data.user,
        }
      }
    }).then((data) => {
      if (data) {
        utils.login(store, data, api)
      }
    })
  },
}
