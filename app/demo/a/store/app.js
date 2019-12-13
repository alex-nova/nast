
export default {
  namespaced: true,
  state: {
    loading: false,
  },
  
  mutations: {
    loading(state, value) {
      state.loading = value
    },
  },
}
