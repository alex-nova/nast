import app from './app'
import config from './config'
import helpers from './ide-helpers'
import functions from './functions'
import debug from './debug'

export default (libs) => {
  app(libs)
  config()
  helpers()
  functions()
  debug()
}
