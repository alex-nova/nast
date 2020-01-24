/**
 *
 */
export default class Model {
  /**
   * @private
   */
  _form
  
  setForm(form) {
    this._form = form
    // this._attributes()
  }
  
  getPost(type) {}
  
  constructor(data) {
    setTimeout(() => {
      const mapper = this._mapper()
      $n.each(this._attributes(), (def, name) => {
        let value
        const mapValue = $n.get(mapper, name)
        if (mapValue) {
          value = $n.isFunction(mapValue) ? mapValue(data) : $n.get(data, mapValue, def)
        } else {
          value = $n.get(data, name, def)
        }
    
        this[name] = value
      })
    })
  }
  
  /**
   * @private
   * @return {Object}
   */
  _mapper() {
    return {}
  }
  
  /**
   * @private
   * @return {Object}
   */
  _rules() {
    return {}
  }
  
  /**
   * Get all attributes { name: 'value', ...}
   * @private
   * @return {Object}
   */
  _attributes() {
    return $n.reduce(this, (result, value, key) => {
      if (![ '_form', ].includes(key)) {
        result[key] = value
      }
      return result
    }, {})
  }
}
