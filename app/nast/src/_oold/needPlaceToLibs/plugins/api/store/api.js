
export default {
  namespaced: true,
  state: () => ({
    online: true,
  }),
  mutations: {
    setOnline(state, value) {
      state.online = value
    },
  },
}
