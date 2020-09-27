import get from 'lodash/get'
import set from 'lodash/set'
import each from 'lodash/each'
import reduce from 'lodash/reduce'
import size from 'lodash/size'


export default (config) => {
  return {
    data: () => ({
      form_inputs: {}, // { default: { username: 'admin', }, }
      form_errors: {}, // { default: { username: [ 'required', ], }, }
      form_initial: {}, // { default: { username: 'admin', }, }
      form_rules: {}, // { default: { phone: '{+7} (000) 000-00-00', }, }
      form_masks: {}, // { default: { username: [ 'required', 'minLength' ], }, }
      form_masksStatus: {}, // { default: { username: true, }, }
      form_validations: config.validations, // { required: (value) => {}, minLength: (value) => {}, }
      form_editable: {}, // { default: true, }
    }),
    computed: {
      $form() {
        return {
          get: this.form_get,
          set: this.form_set,
          init: this.form_init,
          check: this.form_check,
          reset: this.form_reset,
          cancel: this.form_cancel,
          errors: this.form_getErrors,
          rules: this.form_setRules,
          masks: this.form_setMasks,
          getMask: this.form_getMask,
          maskStatus: this.form_maskStatus,
          input: this.form_input,
          editable: this.form_getEditable,
          edit: this.form_edit,
          diff: this.form_diff,
        }
      },
    },
    methods: {
      form_getEditable(form = 'default') {
        return this.form_editable[form]
      },
      form_edit(value, form = 'default') {
        this.$set(this.form_editable, form, (value !== undefined ? value : !this.form_editable[form]))
      },
      form_init(inputs, editable = true, form = 'default') {
        this.$set(this.form_editable, form, editable)
        this.$set(this.form_inputs, form, inputs)
        this.$set(this.form_initial, form, inputs)
      },
      form_getErrors(name, form = 'default') {
        const errors = this.form_errors[form] || {}
        return name ? get(errors, name, [])[0] : errors
      },
      form_get(name, form = 'default') {
        if (this.form_inputs[form] === undefined) {
          return name ? '' : {}
        }
      
        return name ? get(this.form_inputs[form], name) : this.form_inputs[form]
      },
      form_diff(form = 'default') {
        return reduce(this.form_inputs[form], (r, v, k) => {
          if (v !== get(this.form_initial[form], k)) {
            r[k] = v
          }
          return r
        }, {})
      },
      form_set(name, value, form = 'default') {
        if (this.form_inputs[form] === undefined) {
          this.form_inputs[form] = {}
        }
        const newInputs = {
          ...this.form_inputs[form],
        }
        set(newInputs, name, value)
        this.$set(this.form_inputs, form, newInputs)
      },
      form_setRules(rules, form = 'default') {
        this.form_rules[form] = rules
      },
      form_setMasks(masks, form = 'default') {
        this.form_masks[form] = masks
      },
      form_getMask(name, form = 'default') {
        if (this.form_masks[form] === undefined) {
          return name ? '' : {}
        }
    
        return name ? get(this.form_masks[form], name) : this.form_masks[form]
      },
      form_maskStatus(name, value, form = 'default') {
        if (this.form_masksStatus[form] === undefined) {
          this.form_masksStatus[form] = {}
        }
        const newStatus = {
          ...this.form_masksStatus[form],
        }
        set(newStatus, name, value)
        this.$set(this.form_masksStatus, form, newStatus)
      },
      form_input(name, type = 'input', form = 'default') {
        return config.input(this, name, type, form)
      },
      form_reset(form = 'default') {
        this.$set(this.form_inputs, form, this.form_initial[form])
        this.$set(this.form_errors, form, {})
      },
      form_cancel(form = 'default') {
        this.form_reset(form)
        this.form_edit(false, form)
      },
      form_check(name, form = 'default') {
        if (this.form_errors[form] === undefined) {
          this.$set(this.form_errors, form, {})
        }
      
        let errors
        if (name) {
          this.$set(this.form_errors[form], name, {})
          errors = this.form_validate(name, form)
          if (errors) {
            this.$nextTick(() => {
              this.$set(this.form_errors[form], name, errors)
            })
          }
        } else {
          this.$set(this.form_errors, form, {})
          errors = {}
          each(this.form_rules[form], (rules, name) => {
            const inputErrors = this.form_validate(name, form)
            if (inputErrors) {
              errors[name] = inputErrors
            }
          })
          if (errors) {
            this.$nextTick(() => {
              this.form_errors = {
                ...this.form_errors,
                [form]: errors,
              }
            })
          }
        }
        
        return size(errors) === 0
      },
      form_validate(name, form) {
        const rules = this.form_rules[form] && get(this.form_rules[form], name)
        const value = this.form_inputs[form] && get(this.form_inputs[form], name)
        const mask = this.form_masksStatus[form] && get(this.form_masksStatus[form], name)
      
        if (mask === false) {
          return [ this.form_getMessage('mask', value), ]
        }
        if (rules !== undefined) {
          const errors = []
          each(rules, (rule) => {
            const name = rule.name ? rule.name : rule
            const params = rule.params ? rule.params : []
            const validation = this.form_validations[name]
            if (validation) {
              const result = validation(value, params)
              if (!result) {
                errors.push(this.form_getMessage(name, value, params))
              }
            }
          })
        
          return errors.length ? errors : null
        }
        
        return null
      },
      form_getMessage(name, value, params = []) {
        let message = name
        if (config.messages instanceof Function) {
          message = config.messages(name, params, value)
        } else if (config.messages instanceof Object) {
          let messageDef = config.messages[name]
          messageDef = messageDef instanceof Function ? messageDef(name, params, value) : messageDef
          if (messageDef) {
            message = messageDef
          }
        }
        return message
      },
    },
  }
}
