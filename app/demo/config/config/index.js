export default {
  app: {
    baseUrl: '/',
  },
  
  api: {
    servers: {
      default: {
        // dev: 'http://127.0.0.1:8000/api/',
        dev: 'http://46.101.127.68/api/',
        prod: 'http://46.101.127.68/api/',
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
      response.data.content = response.data.data
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
    pageLocaleKey(name) {
      return `app.pages.${name}`
    },
    navLocaleKey(name) {
      return `app.nav.${name}`
    },
  },
  
  auth: {
    api: (u, p) => $api.auth.login(u, p),
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
  
  models: {
    types: [ 'string', 'boolean', 'date', 'datetime', 'time', 'int', 'float', ],
    casts: {
    
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
