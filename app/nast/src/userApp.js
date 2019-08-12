/* eslint-disable no-empty */

let routes = []
let store = {}
let api = {}
let libs = {}
let config = {}
let nast = {}


try {
  routes = require('user-config/routes')
} catch (e) {}

try {
  store = require('user-config/store')
} catch (e) {}

try {
  api = require('user-config/api')
} catch (e) {}

try {
  libs = require('user-config/libs')
} catch (e) {}

try {
  config = require('user-config/config')
} catch (e) {}

try {
  nast = require('user-config/nast')
} catch (e) {}


export {
  routes,
  store,
  api,
  libs,
  config,
  nast,
}
