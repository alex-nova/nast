
export default (projectId) => ({
  apis: {
    getData: () => {},
    editVar: () => {},
    sign: (signId, data) => $api.edms.signs.sign(signId, data),
    
    getRecords: (documentId, tableName, recordId) => $api.edms.records.get(documentId, tableName, recordId).sort([ 'id,desc', ]),
    createRecord: (documentId, tableName, data) => $api.edms.records.create(documentId, tableName, data),
    editRecord: (documentId, tableName, recordId, data) => $api.edms.records.edit(documentId, tableName, recordId, data),
    changeRecordStatus: (documentId, tableName, recordId, data) => $api.edms.records.changeStatus(documentId, tableName, recordId, data),
    deleteRecord: (documentId, tableName, recordId) => $api.edms.records.delete(documentId, tableName, recordId),
  
    getFiles: (documentId) => $api.edms.documents.files.get(documentId),
    saveFile: (data) => $api.files.create(data),
    attachFiles: (documentId, data) => $api.edms.documents.files.create(documentId, data),
    editFile: (documentId, fileId, data) => $api.edms.documents.files.edit(documentId, fileId, data),
    removeFile: (documentId, fileId) => $api.edms.documents.files.delete(documentId, fileId),
  },
  
  translates: {
    statuses: {
      draft: 'Черновик',
      formed: 'Ожидает подписания',
      approved: 'Подписан',
      rejected: 'Отклонен',
    },
  },
  
  custom: {
    projectId,
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
        const constr = params[3] ? ','+params[3] : ''
        return `records,${values.work ? values.work.id : 1},${params[2]}${constr}`
      },
    },
    // assignee,type
    'assignee': {
      url: (field, values, params) => {
        return `assignee,${params[1]}`
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
})
