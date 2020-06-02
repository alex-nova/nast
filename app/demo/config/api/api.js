
/**
 *
 */
export default class CustomApi {
  /**
   * Companies
   */
  companies = {
    get: (id) => $app.api.get([ 'companies*', id, ]),
    create: (data) => $app.api.post('companies').data(data),
    edit: (id, data) => $app.api.patch([ 'companies*', id, ]).data(data),
    
    workers: {
      get: (id) => $app.api.get([ 'companies*/workers', id, ]),
      getSimple: (id) => $app.api.get([ 'companies*/simple', id, ]),
      invite: (companyId, data) => $app.api.post([ 'companies*/workers', companyId, ]).data(data),
    },
    admins: {
      get: (id) => $app.api.get([ 'companies*/admins', id, ]),
      add: (id) => $app.api.post([ 'companies/workers*/admin', id, ]),
      remove: (id) => $app.api.delete([ 'companies/workers*/admin', id, ]),
    },
  }
  
  
  /**
   * My
   */
  my = {
    companies: () => $app.api.get('my/companies'),
    companiesAdmin: () => $app.api.get('my/companies/admin'), // todo temp
    projects: () => $app.api.get('my/projects'),
    structureTree: (projectId, withWorks) => $app.api.get([ 'my/projects*/structure/tree', projectId, ]).query({ works: withWorks, }),
    partners: (projectId) => $app.api.get([ 'my/projects*/partners', projectId, ]),
    participants: (projectId) => $app.api.get([ 'my/projects*/participants', projectId, ]),
    signers: (projectId) => $app.api.get([ 'my/projects*/signers', projectId, ]),
    notifications: () => $app.api.get('my/notifications'),
  }
  
  
  /**
   * Projects
   */
  projects = {
    get: (id) => $app.api.get([ 'projects', id, ]),
    create: (data) => $app.api.post([ 'projects', ]).data(data),
    edit: (id, data) => $app.api.patch([ 'projects', id, ]).data(data),
    delete: (id) => $app.api.delete([ 'projects', id, ]),
    createSub: (parentId, data) => $app.api.post([ 'projects*/sub', parentId, ]).data(data),
  
    sections: {
      create: (data) => $app.api.post([ 'projects*/sections', ]).data(data),
      edit: (id, data) => $app.api.patch([ 'projects/sections*', id, ]).data(data),
      delete: (id) => $app.api.delete([ 'projects/sections*', id, ]),
    },
    
    partners: {
      get: (projectId) => $app.api.get([ 'projects*/partners', projectId, ]).with({ company: null, }),
      getMain: (projectId) => $app.api.get([ 'projects*/partners/main', projectId, ]),
      create: (projectId, data) => $app.api.post([ 'projects*/partners', projectId, ]).data(data),
      acceptInvite: (projectId, data) => $app.api.post([ 'projects*/partners/resolve', projectId, ]).data(data),
    },
    participants: {
      get: (projectId) => $app.api.get([ 'projects*/participants', projectId, ]),
      create: (projectId, data) => $app.api.post([ 'projects*/participants', projectId, ]).data(data),
    },
    accesses: {
      delete: (id) => $app.api.delete([ 'projects/accesses*', id, ]),
      types: {
        get: (projectId, companyId) => $app.api.get([ 'projects*/companies*/accesses/types', projectId, companyId, ]).tree(),
      },
      partners: {
        get: (id) => $app.api.get([ 'projects/partners*/accesses', id, ]).with({ workTypes: {}, }),
        create: (id, data) => $app.api.post([ 'projects/partners*/accesses', id, ]).data(data),
      },
      participants: {
        get: (id) => $app.api.get([ 'projects/participants*/accesses', id, ]).with({ workTypes: {}, specTypes: {}, }),
        create: (id, data) => $app.api.post([ 'projects/participants*/accesses', id, ]).data(data),
      },
    },
    works: {
      get: (projectId) => $app.api.get([ 'projects*/works', projectId, ]),
      supplies: {
        get: (projectId, workId) => $app.api.get([ 'projects*/works*/supplies*', projectId, workId, ]),
      },
      types: {
        get: (id) => $app.api.get([ 'works/types*', id, ]).size(200),
      },
    },
  }
  
  documents = {
    get: (id) => $app.api.get([ 'documents*', id, ]),
    getByProject: (projectId) => $app.api.get([ 'projects*/documents', projectId, ]).size(999),
    getTypes: () => $app.api.get([ 'documents/types', ]).size(999),
    getClasses: () => $app.api.get([ 'documents/classes', ]).size(999),
    create: (data) => $app.api.post([ 'documents', ]).data(data),
    createVersion: (id, file) => {
      const formData = new FormData()
      formData.append('file', file)
      return $app.api.post([ 'documents*/version', id, ]).data(formData).config({ headers: { 'Content-Type': 'multipart/form-data', }, })
    },
    edit: (id, data) => $app.api.patch([ 'documents*', id, ]).data(data),
  }
  
  /**
   * Temp
   */
  
  auth = {
    invite: {
      get: (token) => $app.api.get([ 'auth/invite*', token, ]),
    },
    login: (data) => $app.api.post('auth/login').data(data),
    register: (data, token = '') => $app.api.post([ 'auth/register*', token, ]).data(data),
    registerCompany: (data, token = '') => $app.api.post([ 'auth/registerCompany*', token, ]).data(data),
  }
  
  locale = {
    get: (id) => $app.api.get([ 'locales*', id, ]),
    set: (id) => $app.api.post([ 'locales*', id, ]),
    elements: {
      get: () => $app.api.get([ 'elements', ]),
    },
  }
  
  files = {
    get: (id) => $app.api.get([ 'files*', id, ]),
    create: (file) => {
      const formData = new FormData()
      formData.append('file', file)
      return $app.api.post([ 'files', ]).data(formData).config({ headers: { 'Content-Type': 'multipart/form-data', }, })
    },
    delete: (id) => $app.api.delete([ 'files*', id, ]),
  }
  
  users = {
    get: (id) => $app.api.get([ 'users*', id, ]),
    create: (data) => $app.api.post('users').data(data),
    edit: (id, data) => $app.api.patch([ 'users*', id, ]).data(data),
    editPassword: (id, data) => $app.api.patch([ 'users*/password', id, ]).data(data),
    delete: (id) => $app.api.delete([ 'users*', id, ]),
    documents: {
      get: (userId, id) => $app.api.get([ 'users*/documents*', userId, id, ]),
      create: (userId, data) => $app.api.post([ 'users*/documents', userId, ]).data(data),
    },
  }
  
  journals = {
    get: (projectId, id) => $app.api.get([ 'projects*/journals*', projectId, id, ]),
    records: {
      get: (projectId, journalId, blockName, id) => $app.api.get([ 'projects*/journals***', projectId, journalId, blockName, id, ]),
      getColumns: (projectId, journalId, blockName) => $app.api.get([ 'projects*/journals**/columns', projectId, journalId, blockName, ]),
      getSigns: (projectId, journalId, id, blockName = 'records') =>
        $app.api.get([ 'projects*/journals***/signs', projectId, journalId, blockName, id, ]),
      create: (projectId, journalId, blockName, data) => $app.api.post([ 'projects*/journals**', projectId, journalId, blockName, ]).data(data),
      sign: (projectId, journalId, id, data, blockName = 'records') =>
        $app.api.post([ 'projects*/journals***/signs', projectId, journalId, blockName, id, ]).data(data),
    },
  }
  
  acts = {
    get: (projectId, id) => $app.api.get([ 'projects*/acts*', projectId, id, ]).size(999),
    getTemplates: (projectId) => $app.api.get([ 'projects*/acts/templates', projectId, ]).size(999),
    create: (projectId, data) => $app.api.post([ 'projects*/acts', projectId, ]).data(data),
    sign: (projectId, id, data) => $app.api.post([ 'projects*/acts*/sign', projectId, id, ]).data(data),
    edit: (projectId, id, data) => $app.api.patch([ 'projects*/acts*', projectId, id, ]).data(data),
    delete: (projectId, id) => $app.api.delete([ 'projects*/acts*', projectId, id, ]),
  }
  
  data = {
    get: (projectId, code) => $app.api.get([ 'projects*/data*', projectId, code, ]),
  }
  
  dictionaries = {
    get: (name) => $app.api.get([ 'dictionaries*', name, ]).size(999),
  }
  
  //
  // locales: {
  //   get(id) {
  //     // return $l.api.get($.api.url('v1/locales{/id}', { id, }))
  //   },
  //   get2(id) {
  //     // return $l.api.get([ 'v1/locales{/id}', id, ], User)
  //   },
  // },
}
