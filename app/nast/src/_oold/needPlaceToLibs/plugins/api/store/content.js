import Vue from 'vue/types'


export default {
  namespaced: true,
  state: () => ({}),
  getters: {
    template(state) {
      return (
        name,
        data = $n.get(state[name], 'data'),
        ok = $n.get(state[name], 'ok'),
        status = $n.get(state[name], 'status'),
        updatedAt = $n.get(state[name], 'updatedAt'),
        outdatedAt = $n.get(state[name], 'outdatedAt'),
      ) => ({
        data,
        ok, // boolean
        status, // 'loading', 'error', 'noConnection', 'noTry'
        updatedAt,
        outdatedAt,
      })
    },
  },
  mutations: {
    set(state, { name, value, }) {
      Vue.set(state, name, value)
    },
    delete(state, name) {
      Vue.set(state, name, [])
      Vue.delete(state, name)
    },
  },
  actions: {
    update({ state, getters, commit, rootGetters, }, apis) {
      const names = $n.reduce(apis, (result, data, name) => { // data = [  { name: '', api: () => {}, access: [], refreshTime: 10(in seconds), }, ]
        const can = rootGetters['api/auth/can'](data.access)
        if (can) {
          result.push(name)
        }
        return result
      }, [])
  
      const allNames = $n.merge(Object.keys(state), names)
      $n.each(allNames, (name) => {
        if (!state[name]) {
          commit('set', { name, value: getters.template(name, [], false, 'loading', $app.date().add(-1, 'y'), $app.date()), })
        } else if (!names.includes(name)) {
          commit('delete', name)
        }
      })
    },
    load({ state, getters, commit, dispatch, }, api) {
      const name = api.name
      const outdatedAt = $app.date().add(api.refreshTime || $app.config('api.refreshTime'), 's')
      
      commit('set', { name, value: getters.template(name, undefined, false, 'loading'), })
  
      return api.index().then((response) => {
        const value = { name, value: getters.template(name, response.data.data, true, '', $app.date(), outdatedAt), }
        return dispatch('setToStorage', value).then(() => {
          return true
        })
      }).catch((e) => {
        const status = e.message === 'Network Error' ? 0 : $n.get(e, 'response.code', -1)
        let value
        
        if ($n.size(state[name].data)) {
          value = { name, value: getters.template(name, undefined, true, '', undefined, outdatedAt), }
        } else if (status === 0) {
          value = { name, value: getters.template(name, [], false, 'noConnection', undefined, outdatedAt), }
        } else {
          value = { name, value: getters.template(name, [], false, 'error', undefined, outdatedAt), }
        }
  
        return dispatch('setToStorage', value).then(() => {
          return status
        })
      })
    },
    setToStorage({ state, commit, }, { name, value, }) {
      commit('set', { name, value, })
      return $app.storage.set(name, {
        data: value.data,
        updatedAt: value.updatedAt.format(),
      })
    },
  },
}
