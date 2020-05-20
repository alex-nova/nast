import mocks from '../mocks'

export default {
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
