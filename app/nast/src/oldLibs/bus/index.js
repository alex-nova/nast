import BaseBus from './../_interfaces/Bus'
import bus from './bus'


/**
 *
 */
class Bus extends BaseBus {
  instance
  
  /**
   *
   */
  constructor() {
    super()
    
    this.instance = bus
  }
  
  /**
   * @param {string} name
   * @param {function} callback
   */
  listen(name, callback) {
    this.instance.$on(name, callback)
  }
  
  /**
   * @param {string} name
   */
  emit(name) {
    this.instance.$emit(name)
  }
}


export default Bus
