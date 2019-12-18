import moment from 'moment/moment'
import BaseDate from '../_interfaces/Date'


/**
 *
 */
class Date extends BaseDate {
  /**
   *
   */
  instance
  
  /**
   *
   */
  constructor() {
    super()
    
    this.instance = moment
  }
  
  /**
   * @param {string|number?} input
   * @param {string?} format
   * @return {Moment}
   */
  new(input = undefined, format = undefined) {
    return this.instance(input, format)
  }
}

export default Date
