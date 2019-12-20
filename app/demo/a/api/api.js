import User from './models/User'


export default {
  users: {
    get(id) {
      return $app.api.get([ 'v1/users{/id}', id, ], User)
    },
    create(model) {
      return $app.api.post('v1/users', model)
    },
    articles: {
      get(userId) {
        return $app.api.get('articles').filters({ authorId: userId, })
      },
    },
  },
  
  articles: {
    get(id, data) {
      return $app.api.post([ 'v1/articles{}', id, ]).data(data)
    },
    create(model) {
      return $app.api.post('v1/articles', model)
    },
  },
  
  locales: {
    get(id) {
      return $l.api.get($l.api.url('v1/locales{/id}', { id, }))
    },
    get2(id) {
      return $l.api.get([ 'v1/locales{/id}', id, ], User)
    },
  },
}
