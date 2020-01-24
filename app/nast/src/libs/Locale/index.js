import LocaleInterface from './../../interfaces/libs/Locale'

/**
 *
 */
class Locale extends LocaleInterface {
  
  /**
   */
  constructor() {
    super()
  }
  
  /**
   * @return {RouterGlobalInterface}
   */
  installGlobals() {
    return {
      all: () => this.getPage(name),
      current: () => this.structureByName(name),
      other: () => {},
      set: (name) => {},
    }
  }
  
  /**
   * Всего 17 записей
   * __('app.table.countRecords', 17)
   * 'Всего <b>{param1}</b> запис{ь|и|ей}'
   * @param {String} name
   * @param {Object} params
   * @return {String}
   */
  translate(name, params) {
    return ''
  }
}

export default Locale
