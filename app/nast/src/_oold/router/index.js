import Vue from 'vue/types'
import Router from 'vue-router/types'
import { routes, } from '../../framework/userApp'

/**
 * Create router.
 *
 * @return {VueRouter}
 */
export function createRouter() {
  Vue.use(Router)
  return new Router($app.pages.coreInitRouter(routes))
}
