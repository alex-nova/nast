import mocks from './mocks'


export default {
  auth: {
  
  },
  users: {
    get(id) {
      return $app.api.get([ 'users{}', id, ]).mock(() => {
        if (id) {
          const user = $n.find(mocks.users, [ 'id', id*1, ])
          return {
            ...user,
            company: $n.find(mocks.companies, [ 'id', user.companyId, ]),
          }
        } else {
          return mocks.users
        }
      })
    },
  },
  companies: {
    get(id) {
      return $app.api.get([ 'companies', id, ]).mock(() => {
        if (id) {
          return $n.find(mocks.companies, [ 'id', id*1, ])
        } else {
          return mocks.companies
        }
      })
    },
  },
  
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
