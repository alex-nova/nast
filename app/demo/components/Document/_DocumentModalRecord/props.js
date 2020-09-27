import defaultSettings from './../settings'

export default {
  name: 'NDocumentModalRecord',
  props: {
    template: { type: Object, required: true, },
    tableName: { type: String, required: true, },
    recordId: { type: Number, default: undefined, },
    document: { type: Object, default: undefined, }, // used if index != undefined
    editable: { type: Boolean, default: true, }, // used if index != undefined
    authorId: { type: Number, default: 0, }, // used if index != undefined
    settings: { type: Object, default: () => defaultSettings, },
  
    submit: { type: Function, default: (tableName, record) => {}, },
    doSign: { type: Function, default: (sign) => {}, },
    close: { type: Function, default: () => {}, },
  },
}
