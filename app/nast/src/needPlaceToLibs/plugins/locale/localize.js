import Vue from 'vue'
import localeStore from './store'
import plugin from './plugin'
import { checkApiExist, } from './util'

export default (router, options) => {
  options = checkApiExist(options)
  
  Vue.use(plugin, options)
  
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
              ...options.api,
            })
          },
          
          beforeCreate() {
            // const redirect = () => {
            //   if (this.$route.query.l === undefined) {
            //     this.$router.replace(getRightRoute(this.$route))
            //   }
            // }
  
            this.$store.registerModule('locale', localeStore)
            if (!this.$store.hasModule('locale')) {
              this.$store.dispatch('locale/init', {
                localeCode: this.$route.query.l,
                ...options.api,
              }).then((result) => {
                if (options.initialised) {
                  return options.initialised(result)
                }
                return result
              })
            }
          },
          
          // beforeRouteUpdate(to, from, next) {
          //   if (to.query.l === undefined) {
          //     next(getRightRoute(to))
          //   }
          //   next()
          // },
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
