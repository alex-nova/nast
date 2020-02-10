import pages from './pages'

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
      return response
    },
    catch: (error) => {
      if (error.response.status === 401) {
        $app.auth.logout()
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
