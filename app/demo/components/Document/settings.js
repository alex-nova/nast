
export default {
  apis: {
    getData: () => {},
    editVar: () => {},
    sign: (documentId, data) => {},
    saveFile: (file) => {},
    getFiles: (documentId) => {},
    attachFiles: (documentId, data) => {},
    editFile: (documentId, fileId, data) => {},
    removeFile: (documentId, fileId) => {},
  },
  
  custom: {},
  
  loadFieldData(name) {
    const getUrl = $n.get(this.types, `${this.apiType}.url`, this.types.default.url)
    const apiCode = getUrl(this.field, this.values, this.apiParams)
    
    return $api.data.get(this.projectId, apiCode)
  },
  
  types: {
    // { value: 1, title: '', address: '', }
    'objects': {
      value: (value) => {
        return `${value.title}, ${value.address}`
      },
    },
    // 'works': {
    //   value: (value) => {
    //     return value.title
    //   },
    // },
    // records,{work},type
    'records': {
      select: false,
      component: 'textarea',
      url: (field, values, params) => {
        return `records,${values.work ? values.work.id : 1},${params[2]}`
      },
    },
    // assignee,type
    'assignee': {
      url: (field, values, params) => {
        return `assignee,${params[1]}`
      },
    },
    // assignee,type
    'participants': {
      url: () => {
        return `participants`
      },
    },
    // people,partnerAccessName,participantAccessName,isMain
    'people': {
      url: (field, values, params) => {
        return field.data
      },
    },
    default: {
      select: true,
      component: 'input',
      url: (field, values) => field.data,
      value: (value) => value.display === undefined ? value.title : value.display,
    },
  },
}
