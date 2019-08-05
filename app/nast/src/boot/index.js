import installNastUI from 'nast-ui/utils/webpack'
import libs from './../libs'
import installPlugins from './../plugins'
import app from './global/app'
import functions from './global/functions'
import debug from './global/debug'
import ide from './global/ide-helpers'


const boot = (Vue) => {
  initGlobal()
  
  installNastUI(Vue)
  
  installPlugins(Vue)
  
  $app.storage.config({
    name: `app${$app.config('baseUrl').replace('/', '_').slice(0, -1)}`,
    storeName: 'store',
  })
}

const initGlobal = () => {
  debug()
  functions()
  app(libs)
  ide()
}

export default boot
