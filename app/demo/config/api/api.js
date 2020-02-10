import mocks from './mocks'

/**
 *
 */
export default class CustomApi {
  auth = {
    login: (login, password) => $app.api.post('auth/login').data({ login, password, }),
  }
  
  locale = {
    get: (id) => $app.api.get([ 'locales*', id, ]),
    set: (id) => $app.api.post([ 'locales*', id, ]),
    elements: {
      get: () => $app.api.get([ 'elements', ]),
    },
  }
  
  my = {
    companies: () => $app.api.get('my/companies'),
  }
  
  users = {
    get: (id) => $app.api.get([ 'users*', id, ]),
    create: (data) => $app.api.post('users').data(data),
    edit: (id, data) => $app.api.put([ 'users*', id, ]).data(data),
    editPassword: (id, data) => $app.api.patch([ 'users*/password', id, ]).data(data),
    delete: (id) => $app.api.delete([ 'users*', id, ]),
  }
  
  companies = {
    get: (id) => $app.api.get([ 'companies*', id, ]),
    create: (data) => $app.api.post('companies').data(data),
    edit: (id, data) => $app.api.put([ 'companies*', id, ]).data(data),
    workers: {
      get: (id) => $app.api.get([ 'companies*/workers', id, ]),
      getSimple: (id) => $app.api.get([ 'companies*/noadmins', id, ]),
    },
    admins: {
      get: (id) => $app.api.get([ 'companies*/admins', id, ]),
      add: (companyId, userId) => $app.api.post([ 'companies*/admins/*', companyId, userId, ]),
      remove: (companyId, userId) => $app.api.delete([ 'companies*/admins/*', companyId, userId, ]),
    },
  }
  
  projects = {
    get(id) {
      return $app.api.get([ 'projects', id, ]).filters({ projectId: null, })
    },
    edit(id, data) {
      return $app.api.put([ 'projects', id, ]).data(data)
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
    get(id) {
      return $app.api.get([ 'journals', id, ])
        .mock(() => id ? $n.find(mocks.journals, [ 'id', id*1, ]) : mocks.journals)
    },
    
    records: {
      get(journalId, id = null) {
        return $app.api.get([ 'journals{}/records{}', journalId, id, ])
          .mock(() => id ? $n.find(mocks.records, [ 'id', id*1, ]) : $n.reverse(mocks.records, 'id'))
      },
    },
  }
  
  types = {
    get() {
      return $app.api.get([]).mock(() => {
        return mocks.types
      })
    },
  }
  
  // users: {
  //   get(id) {
  //     return $app.api.get([ 'v1/users{/id}', id, ], User)
  //   },
  //   create(model) {
  //     return $app.api.post('v1/users', model)
  //   },
  //   articles: {
  //     get(userId) {
  //       return $app.api.get('articles').filters({ authorId: userId, })
  //     },
  //   },
  // },
  //
  // articles: {
  //   get(id, data) {
  //     return $app.api.post([ 'v1/articles*', id, ]).data(data)
  //   },
  //   create(model) {
  //     return $app.api.post('v1/articles', model)
  //   },
  // },
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
