
export default {
  namespaced: true,
  state: {
    loading: false,
    user: null,
  },
  
  mutations: {
    loading(state, value) {
      state.loading = value
    },
    login(state, user) {
      state.user = user
    },
  },
}
