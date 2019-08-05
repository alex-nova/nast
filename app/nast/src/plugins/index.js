import inputs from './inputs'
import listener from './listener'
import toggler from './toggler'


export default (Vue) => {
  Vue.use(inputs)
  Vue.use(listener)
  Vue.use(toggler)
}
