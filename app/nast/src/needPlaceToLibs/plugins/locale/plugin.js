import LLink from './Link'
import { getRightRoute, } from './util'

export default {
  install(Vue, options) {
    Vue.mixin({
      components: {
        LLink,
      },
      $locale: {
        api: {
          getLocales: options.api.getLocales,
          getElements: options.api.getElements,
          setLocale: options.api.setLocale,
        },
      },
      computed: {
        $locale() {
          return {
            status: this.$store.state.locale.status,
            current: this.$store.state.locale.locale || {},
            default: this.$store.state.locale.locales[0] || {},
            locales: this.$store.state.locale.locales,
            other: this.$store.getters['locale/other'],
            exist: this.$store.getters['locale/exist'],
            change: (localeCode) => this.$store.dispatch('locale/change', {
              localeCode,
              getElements: options.api.getElements,
              setLocale: options.api.setLocale,
            }),
            route: (route, locale) => {
              return getRightRoute(route, locale)
            },
          }
        },
      },
      methods: {
        __(key) {
          return this.$store.getters['locale/translate'](key)
        },
      },
    })
  },
}
