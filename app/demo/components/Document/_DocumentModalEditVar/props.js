import defaultSettings from './../settings'

export default {
  name: 'NDocumentModalEditVar',
  props: {
    name: {},
    fields: {},
    values: {},
    projectId: {},
    settings: { type: Object, default: () => defaultSettings, },
  },
}
