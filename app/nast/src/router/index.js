import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import { routes, } from './../userApp'


Vue.use(Router)
Vue.use(Meta, {
  keyName: 'html',
  attribute: 'dv-meta',
  ssrAttribute: 'dv-meta-server-rendered',
  tagIDKeyName: 'mid',
})

/**
 * Create router.
 *
 * @return {VueRouter}
 */
export function createRouter() {
  const router = {
    base: $env.prod ? $app.config('baseUrl') : '/',
    mode: 'history',
    fallback: false,
    routes,
  }
  
  return new Router(router)
}
