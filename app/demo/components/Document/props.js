import defaultSettings from './settings'

export default {
  name: 'NDocument',
  props: {
    /**
     * {
     *   fields: {
     *     v1: { value: '', },
     *     v2: { value: '', },
     *   },
     *   tables: [
     *     table1: {
     *       v1: { value: '', },
     *       v2: { value: '', },
     *     },
     *   ],
     *   signs: {
     *     'signer1': {
     *       checkUrl: '',
     *       signedAt: datetime,
     *       isApproved: false,
     *       answer: {
     *         problem: '',
     *         files: [ '/image.jpg', ],
     *       },
     *     }
     *   },
     *   files: [
     *     { id: 1, src: '', name: '', description: '', },
     *   ],
     * }
     */
    document: { type: Object, default: undefined, },
    template: { type: Object, default: undefined, },
    editable: { type: Boolean, default: false, },
    loading: { type: Boolean, default: false, },
    authorId: { type: Number, default: 0, },
    settings: { type: Object, default: () => defaultSettings, },
    
    getData: {},
    
    
    'update:document': { type: Function, default: (data) => {}, }, // eslint-disable-line vue/prop-name-casing
    varEdited: { type: Function, default: (name, value) => {}, },
    recordCreated: { type: Function, default: (tableName, record) => {}, },
    recordEdited: { type: Function, default: (tableName, index, record) => {}, },
    signed: { type: Function, default: (name, sign) => {}, },
    addedFiles: { type: Function, default: (files) => {}, },
    
    projectId: { type: Number, required: true, },
  },
}
