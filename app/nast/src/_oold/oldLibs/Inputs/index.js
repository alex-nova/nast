import get from 'lodash/get'
import set from 'lodash/set'
import each from 'lodash/each'
import size from 'lodash/size'
import LibraryInterface from '../_interfaces/Library'


/**
 *
 */
class Inputs extends LibraryInterface {
  /**
   *
   * @return {{}}
   */
  systemMixin() {
    const options = {
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
      input: (self, name) => ({
        name,
        value: self.$form.get(name),
        input: (value) => self.$form.set(name, value),
        danger: self.$form.errors(name),
      }),
    }
    
    
    return {
      data: () => ({
        inputs_inputs: {}, // { default: { username: 'admin', }, }
        inputs_errors: {}, // { default: { username: [ 'required', ], }, }
        inputs_initial: {}, // { default: { username: 'admin', }, }
        inputs_rules: {}, // { default: { username: [ 'required', 'minLength' ], }, }
        inputs_validations: options.validations, // { required: (value) => {}, minLength: (value) => {}, }
      }),
      computed: {
        $inputs() {
          return {
            get: this.inputs_get,
            set: this.inputs_set,
            init: this.inputs_init,
            check: this.inputs_check,
            reset: this.inputs_reset,
            errors: this.inputs_getErrors,
            rules: this.inputs_setRules,
            input: this.input_input,
          }
        },
      },
      methods: {
        inputs_init(inputs, form = 'default') {
          this.$set(this.inputs_inputs, form, inputs)
          this.$set(this.inputs_initial, form, inputs)
        },
        inputs_getErrors(name, form = 'default') {
          const errors = this.inputs_errors[form] || {}
          return name ? get(errors, name, [])[0] : errors
        },
        inputs_get(name, form = 'default') {
          if (this.inputs_inputs[form] === undefined) {
            return name ? '' : {}
          }
      
          return name ? get(this.inputs_inputs[form], name) : this.inputs_inputs[form]
        },
        inputs_set(name, value, form = 'default') {
          if (this.inputs_inputs[form] === undefined) {
            this.inputs_inputs[form] = {}
          }
      
          const newInputs = {
            ...this.inputs_inputs[form],
          }
          set(newInputs, name, value)
          this.$set(this.inputs_inputs, form, newInputs)
        },
        inputs_setRules(rules, form = 'default') {
          this.inputs_rules[form] = rules
        },
        input_input(name) {
          return options.input(this, name)
        },
        inputs_reset() {
          this.inputs_inputs = {
            ...this.inputs_initial,
          }
          this.inputs_errors = {}
        },
        inputs_check(name, form = 'default') {
          if (this.inputs_errors[form] === undefined) {
            this.$set(this.inputs_errors, form, {})
          }
      
          let errors
          if (name) {
            this.$set(this.inputs_errors[form], name, {})
            errors = this.inputs_validate(name, form)
            if (errors) {
              this.$nextTick(() => {
                this.$set(this.inputs_errors[form], name, errors)
              })
            }
          } else {
            this.$set(this.inputs_errors, form, {})
            errors = {}
            each(this.inputs_rules[form], (rules, name) => {
              const inputErrors = this.inputs_validate(name, form)
              if (inputErrors) {
                set(errors, name, inputErrors)
              }
            })
            if (errors) {
              this.$nextTick(() => {
                this.inputs_errors = {
                  [form]: errors,
                }
              })
            }
          }
      
          return size(errors) === 0
        },
        inputs_validate(name, form) {
          const rules = this.inputs_rules[form] && get(this.inputs_rules[form], name)
          const value = this.inputs_inputs[form] && get(this.inputs_inputs[form], name)
      
          if (rules !== undefined && value !== undefined) {
            const errors = []
            each(rules, (rule) => {
              const name = rule.name ? rule.name : rule
              const params = rule.params ? rule.params : []
              const validation = this.inputs_validations[name]
              if (validation) {
                const result = validation(value, params)
                if (!result) {
                  let message = name
                  if (options.messages instanceof Function) {
                    message = options.messages(name, params, value)
                  } else if (options.messages instanceof Object) {
                    let messageDef = options.messages[name]
                    messageDef = messageDef instanceof Function ? messageDef(name, params, value) : messageDef
                    if (messageDef) {
                      message = messageDef
                    }
                  }
                  errors.push(message)
                }
              }
            })
        
            return errors.length ? errors : null
          }
        },
      },
    }
  }
}

export default Inputs
