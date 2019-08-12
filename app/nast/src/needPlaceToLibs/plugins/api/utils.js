import axios from 'axios'


const axiosInstance = axios.create({})

export default {
  request(method, url, params = {}, api = 'base') {
    let baseURL = $app.config(`api.${api}.${$env.prod ? 'prod' : 'dev'}`, '')
    if (baseURL.indexOf('http') !== 0) {
      baseURL = `${$app.config('baseUrl').slice(0, -1)}${baseURL}`
    }
    
    return axiosInstance({
      url,
      method,
      baseURL,
      ...params,
    })
  },
  
  updateAuthHeader(token) {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      $app.cookie.set('auth_token', token)
    } else {
      axiosInstance.defaults.headers.common['Authorization'] = ''
      $app.cookie.remove('auth_token')
    }
  },
  
  login(store, data, api) {
    store.dispatch('api/auth/login', data)
    store.dispatch('api/content/update', api.fetch)
  },
  
  logout(store, api) {
    store.dispatch('api/auth/logout')
    store.dispatch('api/content/update', api.fetch)
  },
  
  fetch(store, api) { // { name: '', api: () => {}, access: [], refreshTime: 0, }
    return store.dispatch('api/content/load', api).then((status) => {
      if (status === 0) {
        store.commit('api/setOnline', false)
      } else if (!store.state.api.online) {
        store.commit('api/setOnline', true)
      }
    })
  },
}
