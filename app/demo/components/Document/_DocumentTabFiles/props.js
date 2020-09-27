import defaultSettings from '../settings'

export default {
  name: 'NDocumentTabFiles',
  props: {
    document: { type: Object, required: true, },
    settings: { type: Object, default: () => defaultSettings, },
    editable: { type: Boolean, default: false, },
    
    addFiles: { type: Function, default: () => {}, },
  },
}
