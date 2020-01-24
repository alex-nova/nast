import app from './app'
import config from './config'
import helpers from './ide-helpers'
import functions from './functions'
import debug from './debug'


export const initGlobalVariables = () => {
  config()
  helpers()
  functions()
  debug()
}

export const initLibVariables = (libs) => {
  app(libs)
}

export const initApiVariables = (libs) => {
  /** @var {CustomApi} */
  global.$api = libs.api.coreInitApi()
  
  /** @var {CustomModels} */
  global.$models = libs.api.coreInitModels()
}
