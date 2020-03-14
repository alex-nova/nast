
export default {
  namespaced: true,
  state: {
    project: null,
    
    loading: false,
  },
  
  mutations: {
    project(state, value) {
      state.project = value
    },
    loading(state, value) {
      state.loading = value
    },
  },
}
