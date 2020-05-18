import CField from './Field'

export default (content) => {
  return {
    template: content,
    components: { CField, },
    props: {
      projectId: { type: Number, required: true, },
      fields: { type: Object, default: () => ({}), },
      values: { type: Object, default: () => ({}), },
      editable: { type: Boolean, default: false, },
    },
    methods: {
      change(key, value) {
        this.$emit('change', key, value)
      },
    },
  }
}
