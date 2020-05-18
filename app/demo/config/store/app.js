
export default {
  namespaced: true,
  state: {
    sectionTypes: {
      project: 'Проект',
      object: 'Объект',
      section: 'Раздел',
      construction: 'Конструкция',
    },
    
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
