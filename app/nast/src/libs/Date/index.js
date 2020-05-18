import moment from 'moment'
import DateInterface from './../../interfaces/libs/Date'

/**
 *
 */
class Date extends DateInterface {
  /**
   *
   */
  constructor() {
    super()
  }
  
  /**
   *
   * @return {DateGlobalInterface}
   */
  installGlobals() {
    return {
      now: moment,
      format: (datetime, type) => this.format(datetime, type),
    }
  }
  
  /**
   * @param {*} datetime
   * @param {string} type
   * @return {string}
   */
  format(datetime, type = 'date') {
    if (!datetime) {
      return ''
    }
    const formats = {
      date: 'DD.MM.YYYY',
      time: 'HH:mm',
      datetime: 'DD.MM.YYYY HH:mm',
    }
    return moment(datetime).format($n.get(formats, type, formats.datetime))
  }
}

export default Date
