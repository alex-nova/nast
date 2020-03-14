import mocks from './mocks'

/**
 *
 */
export default class CustomApi {
  temp = {
    myAdminCompanies: () => $app.api.get([ 'companies/myAdmin', ]),
  }
  
  auth = {
    invite: {
      get: (token) => $app.api.get( [ 'auth/invite*', token, ]),
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
  
  my = {
    companies: () => $app.api.get('my/companies'),
    projects: () => $app.api.get('my/projects'),
    notifications: () => $app.api.get('my/notifications'),
  }
  
  users = {
    get: (id) => $app.api.get([ 'users*', id, ]),
    create: (data) => $app.api.post('users').data(data),
    edit: (id, data) => $app.api.put([ 'users*', id, ]).data(data),
    editPassword: (id, data) => $app.api.patch([ 'users*/password', id, ]).data(data),
    delete: (id) => $app.api.delete([ 'users*', id, ]),
    documents: {
      get: (userId, id) => $app.api.get([ 'users*/documents*', userId, id, ]),
      create: (userId, data) => $app.api.post([ 'users*/documents', userId, ]).data(data),
    },
  }
  
  companies = {
    get: (id) => $app.api.get([ 'companies*', id, ]),
    create: (data) => $app.api.post('companies').data(data),
    edit: (id, data) => $app.api.put([ 'companies*', id, ]).data(data),
    workers: {
      get: (id) => $app.api.get([ 'companies*/workers', id, ]),
      getSimple: (id) => $app.api.get([ 'companies*/noadmins', id, ]),
      invite: (companyId, data) => $app.api.post([ 'companies*/workers/invite', companyId, ]).data(data),
    },
    admins: {
      get: (id) => $app.api.get([ 'companies*/admins', id, ]),
      add: (companyId, userId) => $app.api.post([ 'companies*/admins/*', companyId, userId, ]),
      remove: (companyId, userId) => $app.api.delete([ 'companies*/admins/*', companyId, userId, ]),
    },
  }
  
  projects = {
    get: (id) => $app.api.get([ 'projects', id, ]),
    create: (data) => $app.api.post([ 'projects', ]).data(data),
    edit: (id, data) => $app.api.patch([ 'projects', id, ]).data(data),
    delete: (id) => $app.api.delete([ 'projects', id, ]),
    getStructure: (id) => $app.api.get([ 'projects*/structure', id, ]),
    createSub: (parentId, data) => $app.api.post([ 'projects*/sub', parentId, ]).data(data),
    
    delegations: {
      get: (projectId) => $app.api.get([ 'projects*/delegations', projectId, ]),
      create: (projectId, data) => $app.api.post([ 'projects*/delegations', projectId, ]).data(data),
    },
    partners: {
      invite: (projectId, data) => $app.api.post([ 'projects*/partners/invite', projectId, ]).data(data),
      acceptInvite: (projectId) => $app.api.post([ 'projects*/partners/invite/accept', projectId, ]),
    },
    participants: {
      get: (projectId) => $app.api.get([ 'projects*/participants', projectId, ]),
      create: (projectId, data) => $app.api.post([ 'projects*/participants', projectId, ]).data(data),
      getMain: (projectId) => $app.api.get([ 'projects*/mainUsers', projectId, ]),
      getMainInvites: (projectId) => $app.api.get([ 'projects*/invites/mainUsers', projectId, ]),
    },
    
    docs: {
      post(id, data) {
        return $app.api.post([ 'projects*/files', id, ], data).mock(() => {
          const name = data.type === 1 ? data.name : data.typeName
          mocks.docs.push({ id: mocks.docs.length+1, name, desc: data.desc, file: '123', type: data.type, })
        })
      },
    },
    docs2: {
      post(id, data) {
        return $app.api.post([ 'projects*/files', id, ], data).mock(() => {
          mocks.docs2.push({ id: mocks.docs2.length+1, name: data.name, desc: data.desc, file: '123', type: data.type, object: data.object, })
        })
      },
    },
    materials: {
      get(id) {
        return $app.api.get([ 'projects*/materials', id, ]).mock(() => {
          return $n.reverse(mocks.materials)
        })
      },
      post(data) {
        return $app.api.post([ 'projects*/files', ], data).mock(() => {
          mocks.materials.push({ id: mocks.materials.length+1, name: data.name, desc: data.desc, count: data.count, unit: data.unit, })
        })
      },
    },
    works: {
      get(id) {
        return $app.api.get([ 'projects/{}/files', id, ]).mock(() => {
          return $n.reverse(mocks.works)
        })
      },
      post(data) {
        return $app.api.post([ 'projects*/files', ], data).mock(() => {
          mocks.works.push({ id: mocks.works.length+1, name: data.name, type: data.type, object: data.object, })
        })
      },
    },
  }
  
  journals = {
    get: (id) => $app.api.get([ 'projects/journals*', id, ]),
    getSpec: (projectId) => $app.api.get([ 'projects*/journals/spec', projectId, ]),
    getColumns: (projectId, journalId, blockName) => $app.api.get([ 'projects*/journals**/columns', projectId, journalId, blockName, ]),
    getBlock: (projectId, journalId, blockName) => $app.api.get([ 'projects*/journals**', projectId, journalId, blockName, ]),
    records: {
      get: (id, journalId, blockName) => $app.api.get([ 'projects/journals**/records*', journalId, blockName, id, ]),
      create: (projectId, journalId, blockName, data) => $app.api.post([ 'projects*/journals**', projectId, journalId, blockName, ]).data(data),
    },
  }
  
  sections = {
    create: (data) => $app.api.post([ 'sections', ]).data(data),
    edit: (id, data) => $app.api.patch([ 'sections*', id, ]).data(data),
    delete: (id) => $app.api.delete([ 'sections*', id, ]),
  }
  
  types = {
    get: (id) => $app.api.get([ 'types*', id, ]),
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
