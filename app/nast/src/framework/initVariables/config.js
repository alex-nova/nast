import get from 'lodash/get'
import defaultConfig from './../config'
import { config as appConfig, } from '../userApp'


export default () => {
  global.$config = (key, def = undefined) => {
    return get(appConfig, key, get(defaultConfig, key, def))
  }
}
