import installNastUI from 'nast-ui/utils/webpack'
import libs from '../../libs'
import app from './global/app'
import functions from './global/functions'
import debug from './global/debug'
import ide from './global/ide-helpers'
import globalConfig from './global/config'


const boot = (Vue) => {
  globalConfig()
  initGlobal()
  
  if ($env.prod) {
    installNastUI(Vue)
  } else {
    Vue.use(require('nast-ui/src').default)
  }
  
  $app.storage.config({
    name: `app${$config('app.baseUrl').replace('/', '_').slice(0, -1)}`,
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
