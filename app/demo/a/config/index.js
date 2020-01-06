export default {
  app: {
    baseUrl: '/',
  },
  
  api: {
    servers: {
      default: {
        dev: 'https://cms.nova.st/api/',
        prod: 'api/',
      },
    },
  },
  
  form: {
    input: (self, name, form) => ({
      name,
      value: self.$inputs.get(name, form),
      input: (value) => self.$inputs.set(name, value, form),
      danger: self.$inputs.errors(name, form),
      text: !self.$inputs.editable(form),
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
