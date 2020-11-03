import defaultSettings from './../settings'

export default {
  name: 'NDocumentModalEditVar',
  props: {
    name: {},
    fields: {},
    values: {},
    projectId: {},
    document: {},
    settings: { type: Object, default: () => defaultSettings, },
  },
}
