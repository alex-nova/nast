import User from './models/User'


export default {
  users: {
    get(get, id) {
      return get('/api/v1/users/'+id, User)
    },
  },
}
