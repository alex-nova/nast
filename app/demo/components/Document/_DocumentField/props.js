export default {
  name: 'NDocumentField',
  props: {
    value: { type: String, default: '', },
    tip: { type: String, default: '', },
    editable: { type: Boolean, default: false, },
    
    click: { type: Function, default: () => {}, },
  },
}
