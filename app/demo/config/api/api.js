import mocks from './mocks'


export default class CustomApi {
  auth = {
    login(username, password) {
      return $app.api.post('auth/login').data({ email: username, password, })
    },
  }
  users = {
    get(id) {
      return $app.api.get([ 'users{}', id, ])
        .mock(() => {
          let content
          if (id) {
            const user = $n.find(mocks.users, [ 'id', id*1, ])
            content = {
              ...user,
              company: $n.find(mocks.companies, [ 'id', user.companyId, ]),
            }
          } else {
            content = mocks.users
          }
          return content
        })
    },
  }
  companies = {
    get(id) {
      return $app.api.get([ 'companies', id, ])
        .mock(() => {
          const content = id ? $n.find(mocks.companies, [ 'id', id*1, ]) : mocks.companies
          return content
        })
    },
  }
  
  projects = {
    get(id) {
      return $app.api.get([ 'projects', id, ])
    },
    edit(id, data) {
      return $app.api.put([ 'projects', id, ]).data(data)
    },
    
    docs: {
      post(id, data) {
        return $app.api.post([ 'projects{}/files', id, ], data).mock(() => {
          const name = data.type === 1 ? data.name : data.typeName
          mocks.docs.push({ id: mocks.docs.length+1, name, desc: data.desc, file: '123', type: data.type, })
        })
      },
    },
    docs2: {
      post(id, data) {
        return $app.api.post([ 'projects{}/files', id, ], data).mock(() => {
          mocks.docs2.push({ id: mocks.docs2.length+1, name: data.name, desc: data.desc, file: '123', type: data.type, object: data.object, })
        })
      },
    },
    materials: {
      post(data) {
        return $app.api.post([ 'projects{}/files', ], data).mock(() => {
          mocks.materials.push({ id: mocks.materials.length+1, name: data.name, desc: data.desc, count: data.count, unit: data.unit, })
        })
      },
    },
    works: {
      post(data) {
        return $app.api.post([ 'projects{}/files', ], data).mock(() => {
          mocks.works.push({ id: mocks.works.length+1, name: data.name, type: data.type, object: data.object, })
        })
      },
    },
  }
  
  objects = {
    get(id) {
      return $app.api.get([ 'quizzes', id, ])
        .mock(() => {
          let content
          if (id) {
            const object = $n.find(mocks.objects, [ 'id', id*1, ])
            content = {
              ...object,
              project: $n.find(mocks.projects, [ 'id', object.projectId, ]),
            }
          } else {
            content = mocks.objects
          }
          return content
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
  //     return $app.api.post([ 'v1/articles{}', id, ]).data(data)
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
