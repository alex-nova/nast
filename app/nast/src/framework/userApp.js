/* eslint-disable no-empty */

let routes = []
let store = {}
let api = {}
let libs = {}
let config = {}

try {
  routes = require('user-config/routes').default
} catch (e) {}

try {
  store = require('user-config/store').default
} catch (e) {}

try {
  api = require('user-config/api').default
} catch (e) {}

try {
  libs = require('user-config/libs').default
} catch (e) {}

try {
  config = require('user-config/config').default
} catch (e) {}

export {
  routes,
  store,
  api,
  libs,
  config,
}
