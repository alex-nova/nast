

/**
 *
 */
class ApiModel {
  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    if (value !== undefined) {
      this[name] = value
    }
  }
  
  /**
   *
   * @return {Array}
   */
  toObject() {
    return []
  }
}


/**
 *
 */
export default class User extends ApiModel {
  username = ''
  name = ''
  isAdmin = false
  profile = false
  
  /**
   * @param {object} model
   */
  constructor(model) {
    super()
    this.set('username', model.username)
    this.set('name', model.name)
    this.set('isAdmin', model.isAdmin)
  }
}
