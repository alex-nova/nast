import BaseLocale from './../_interfaces/Locale'
import { checkApiExist, } from '../../plugins/locale/util'
import plugin from '../../plugins/locale/plugin'
import localeStore from '../../plugins/locale/store'


/**
 *
 */
class Locale extends BaseLocale {
  /**
   *
   */
  vue
  
  /**
   *
   */
  cookie
  
  /**
   *
   * @param {Vue} vue
   * @param {Cookie} cookie
   */
  constructor(vue, cookie) {
    super()
    
    this.vue = vue
    this.cookie = cookie
  }
  
  installStore(vue) {
  }
  
  installPlugin(vue, options) {
    vue.use(plugin, options)
  }
  
  /**
   * @param {object} router VueRouter object
   * @param {object} options
   * @return {object} VueRouter object
   */
  localizeRouter(router, options) {
    options = checkApiExist(options)
  
    return {
      ...router,
      routes: [
        {
          path: '/',
          component: {
            render: (r) => r('router-view'),
          
            asyncData({ store, route, }) {
              if (!store.hasModule('locale')) {
                store.registerModule('locale', localeStore)
              }
              return store.dispatch('locale/init', {
                localeCode: route.query.l,
                ...options.index,
              })
            },
          
            beforeCreate() {
              this.$store.registerModule('locale', localeStore)
              
              if (!this.$store.hasModule('locale')) {
                this.$store.dispatch('locale/init', {
                  localeCode: this.$route.query.l,
                  ...options.index,
                }).then((result) => {
                  if (options.initialised) {
                    return options.initialised(result)
                  }
                  return result
                })
              }
            },
            watch: {
              '$route.query.l'() {
                this.$locale.change(this.$route.query.l)
              },
            },
          },
          children: router.routes,
        },
      ],
    }
  }
}

export default Locale
