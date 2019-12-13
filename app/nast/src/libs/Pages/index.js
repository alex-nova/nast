import PagesInterface from './../../interfaces/libs/Pages'
import Meta from 'vue-meta'

/**
 *
 */
class Pages extends PagesInterface {
  /**
   * @param {Vue} Vue
   * @param {array} routes
   * @return {RouterOptions} options to new Router(options)
   */
  coreInitRouter(Vue, routes) {
    // TODO разобраться в конфиге
    Vue.use(Meta, {
      keyName: 'html',
      attribute: 'dv-meta',
      ssrAttribute: 'dv-meta-server-rendered',
      tagIDKeyName: 'mid',
    })
    
    return {
      base: $env.prod ? $config('app.baseUrl') : '/',
      mode: 'history',
      fallback: false,
      routes,
    }
  }
}

export default Pages
