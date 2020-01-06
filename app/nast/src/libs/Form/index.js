import FormInterface from './../../interfaces/libs/Form'
import mixin from './mixin'

/**
 *
 */
class Form extends FormInterface {
  /**
   * @return {Object}
   */
  installMixin() {
    return mixin($n.merge(this._defaultConfig(), $config('form')))
  }
  
  /**
   * @return {Object}
   * @private
   */
  _defaultConfig() {
    return {
      validations: {
        required(value) {
          return value.length > 0
        },
        email(value) {
          return value.indexOf('@') !== -1
        },
        phone(value) {
          return value.indexOf('+') !== -1
        },
      },
      messages: {
        required: 'Поле обязательно для заполнения',
        email: 'Поле должно быть email адресом',
        phone: 'Поле должно быть корректным телефонным номером',
        between: (name, params, value) => `Поле должно быть от ${params[0]} до ${params[1]}`,
      },
      input: (self, name, form) => ({
        name,
        value: self.$form.get(name, form),
        input: (value) => self.$form.set(name, value, form),
        danger: self.$form.errors(name, form),
        text: !self.$form.editable(form),
      }),
    }
  }
}

export default Form
