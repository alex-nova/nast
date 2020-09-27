import defaultSettings from './../settings'

export default {
  name: 'NDocumentModalAddFile',
  props: {
    document: { type: Object, required: true, },
    settings: { type: Object, default: () => defaultSettings, },
  
    submit: { type: Function, default: (tableName, record) => {}, },
    close: { type: Function, default: () => {}, },
  },
}
