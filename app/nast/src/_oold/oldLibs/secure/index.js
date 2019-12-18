import xss from 'xss/typings/xss'
import BaseSecure from '../_interfaces/Secure'


/**
 *
 */
class Secure extends BaseSecure {
  /**
   *
   * @param {string} content
   * @param {object} whiteList
   * @return {string} xss cleaned content
   */
  clean(content, whiteList = { p: [], br: [], }) {
    return xss(value, { whiteList, })
  }
}

export default Secure
