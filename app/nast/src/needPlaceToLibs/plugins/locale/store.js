
export default {
  namespaced: true,
  state: () => ({
    // loading | loaded | error
    status: 'loading',
    // currentLocale
    // { name: '', code: '', }
    locale: null,
    // Object[] all locales
    locales: [],
    // переводы с бэка
    elements: {},
    
    prefix: 'l-',
  }),
  getters: {
    exist(state) {
      return (localeCode) => $n.find(state.locales, [ 'code', localeCode, ])
    },
    other(state) {
      if (!state.locale) {
        return []
      }
      return state.locales.filter((l) => l.code !== state.locale.code)
    },
    translate(state) {
      return (key) => {
        if (!state.locale) {
          return ''
        }
        
        let result = $n.get(state.elements[state.locale.code], key)
        if (!result) {
          result = $n.get(state.elements[state.locales[0].code], key)
        }
        
        if (result) {
          return result
        } else {
          $app.log.warn(`Locale: Translate with key ${key} not found`)
          return key
        }
      }
    },
  },
  mutations: {
    setStatus(state, status) {
      state.status = status
    },
    setElements(state, { locale, elements, }) {
      state.elements = {
        ...state.elements,
        [locale.code]: elements,
      }
    },
    setLocale(state, locale) {
      state.locale = locale
      // $app.cookie.set('locale', locale.code)
    },
    setLocales(state, locales) {
      if (!locales || !locales[0]) {
        console.error('Plugin locale: Cannot load locales!')
        locales = [ {}, ]
      }
      state.locales = locales
    },
  },
  actions: {
    onInitError({ state, }, error) {
      // Можно написать логику инициализации дефолтного языка при недоступности бэка
      console.error('Plugin locale: Locale initialise error!')
    },
    
    init({ state, getters, commit, dispatch, }, { localeCode, getElements, getLocales, setLocale, }) {
      return getLocales().then((response) => {
        commit('setLocales', response.data)
        const locale = getters.exist(localeCode) || {}
        return dispatch('change', {
          localeCode: locale.code || state.locales[0].code,
          getElements,
          setLocale,
        })
      }).catch((e) => {
        dispatch('onInitError', e)
        throw e
      })
    },
    change({ state, getters, commit, }, { localeCode, getElements, setLocale, }) {
      if (localeCode === undefined) {
        localeCode = state.locales[0] ? state.locales[0].code : undefined
      }
      const locale = getters.exist(localeCode)
      if (locale) {
        commit('setStatus', 'loading')
      } else {
        console.error(`Plugin locale: Locale '${locale}' not found`)
        return {}
      }
  
      return Promise.all([ getElements(locale), setLocale(locale), ]).then((response) => {
        commit('setElements', { locale, elements: response[0].data, })
        commit('setLocale', locale)
        commit('setStatus', 'loaded')
        return response[0]
      }).catch((e) => {
        commit('setStatus', 'error')
        console.error(`Plugin locale: Loading error '${locale}'`, e)
        throw e
      })
    },
  },
}
