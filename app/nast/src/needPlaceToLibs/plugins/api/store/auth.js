import utils from './../utils'


export default {
  namespaced: true,
  state: () => ({
    token: '',
    user: {},
  }),
  getters: {
    permissionsByName(state) {
      const permissions = state.user.permissions || []
      return $n.reduce(permissions, (result, p) => {
        result[p.name] = p
        return result // { pName1: {permission}, pName2: {permission}, }
      }, {})
    },
    can: (state, getters) => (permissions) => {
      if (!permissions || $n.size(permissions) === 0) {
        return true
      }
      
      const permissionsProp = $n.isArray(permissions) ? permissions : [ permissions, ]
      let can = true
      
      $n.each(permissionsProp, (name) => {
        if (!getters['permissionsByName'][name]) {
          can = false
          return false
        }
      })
      
      return can
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
  },
}
