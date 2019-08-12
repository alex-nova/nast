import get from 'lodash/get'
import { config as appConfig, } from './../userApp'
import defaultConfig from './default'

/**
 * @param {string} key
 * @param {string?} def
 * @return {string}
 */
export default (key, def = undefined) => {
  return get(appConfig, key, get(defaultConfig, key, def))
}
