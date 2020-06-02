export default {
  namespaced: true,
  state: {
    company: null,
    sectionTypes: {
      project: 'Проект',
      object: 'Объект',
      section: 'Раздел',
      construction: 'Конструкция',
    },
    
    project: null,
    loading: false,
    
    _save: [ 'company', 'project', ],
  },
  
  getters: {
    company(state) {
      return state.company || {}
    },
  },
  
  mutations: {
    project(state, value) {
      state.project = value
    },
    loading(state, value) {
      state.loading = value
    },
    company(state, value) {
      state.company = value
      $app.api.config({ headers: { 'Company-Id': value.id, }, })
    },
  },
}
