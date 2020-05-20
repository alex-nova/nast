import pages from './pages'

// todo delete
import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
Vue.use(VueToast)
//

export default {
  app: {
    baseUrl: '/',
  },
  
  api: {
    servers: {
      default: {
        dev: 'http://127.0.0.1:8000/api/',
        prod: 'https://demo.eq.nova.st/api/',
      },
      nova: {
        dev: 'https://cms.nova.st/api/',
        prod: 'api/',
      },
    },
    init: () => {
      $app.api.config({})
    },
    callback: (response) => {
      if (!response.data.content) {
        response.data.content = response.data.data
      }
      if (response.data.message) {
        Vue.$toast.open({
          message: response.data.message,
          type: 'success',
          position: 'top-right',
          duration: 5000,
        })
      }
      return response
    },
    catch: (error) => {
      if (error.response.status === 401) {
        $app.auth.logout()
      } else {
        Vue.$toast.open({
          message: 'Ошибка: ' + error.response.data.message,
          type: 'error',
          position: 'top-right',
          duration: 5000,
        })
      }
      throw error
    },
    dataKey: 'data.content',
  },
  
  data: {
    preload: false,
  },
  
  router: {
    pageTitle(name, type) {
      return `app.${type}.${name}`
    },
    titles() {
      return pages()
    },
    navigation() {
      return [
        { name: 'index', },
        { name: 'company.list', },
        { name: 'projects.list', },
        { name: 'journals.index', },
        { name: 'notifications.list', },
      ]
    },
  },
  
  auth: {
    api: (l, p) => $api.auth.login(l, p),
    getToken: (response) => {
      return response.data.content.token
    },
    getUser: (response) => {
      return response.data.content.user
    },
  },
  
  locale: {
    api: {
      locales: () => {},
      elements: () => {},
      change: () => {},
    },
  },
  
  form: {
    input: (self, name, form) => ({
      name,
      value: self.$form.get(name, form),
      input: (value) => self.$form.set(name, value, form),
      danger: self.$form.errors(name, form),
      text: self.$form.editable(form) === false,
    }),
    validations: {
      customRule(value) {
        return value.length === 14
      },
    },
    messages: {
      customRule: 'Ошибка',
    },
  },
}
