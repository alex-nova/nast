
/**
 *
 */
export default class ApiObject {
  _instance
  _url
  _version = 1
  _method
  _config = {}
  _model = null
  _data = undefined
  _mock = undefined
  _mockTimeout = 500
  _beforeCallbacks = {}
  // TODO add then catch and finally
  _callbacks = {}
  
  _page = 0
  _size = 0
  _sort = []
  _search = ''
  _filters = {}
  
  _with = {}
  _fields = []
  
  _tree = false
  _all = false
  _query = {}
  
  /**
   * @param {String|Array} url
   * @param {String} method
   * @param {Object} instance
   * @param {Object} config
   */
  constructor(url, method, instance, config = {}) {
    this._url = url
    this._method = method
    this._instance = instance
    
    this.config(config)
  }
  
  /**
   * @param {Function} callback
   * @return {Promise}
   */
  then(callback) {
    $n.each(this._beforeCallbacks, (callback) => {
      callback()
    })
    
    let promise
    if (this._mock) {
      promise = new Promise((resolve) => {
        setTimeout(() => {
          const data = {}
          $n.set(data, $config('api.dataKey'), this._mock())
          resolve(data)
        }, this._mockTimeout)
      })
    } else {
      promise = this._instance({
        ...this._config,
        method: this._method,
        url: this.getUrl(),
        data: this._data,
      })
    }
    
    const callbacks = [
      $config('api.callback'),
      (response) => {
        if (this._model) {
          const key = $config('api.dataKey')
          let data = $n.get(response, key)
          if ($n.isArray(data)) {
            data = $n.map(data, (value) => {
              return new (this._model)(value)
            })
          } else {
            data = new (this._model)(data)
          }
          $n.set(response, key, data)
        }
        return response
      },
      ...Object.values(this._callbacks),
      callback,
    ]
  
    for (const i in Object.keys(callbacks)) {
      if ({}.hasOwnProperty.call(callbacks, i)) {
        promise.then(callbacks[i])
      }
    }
    
    promise.catch($config('api.catch'))
    
    return promise
  }
  
  /**
   * @param {ApiConfigInterface} config
   * @return {ApiObject}
   */
  config(config) {
    if (config.useVersion === false) {
      this._version = 0
    }
    
    $n.merge(this._config, config)
    return this
  }
  
  /**
   * @param {Function} callback
   * @param {String} name
   * @return {ApiObject}
   */
  before(callback, name = 'default') {
    this._beforeCallbacks[name] = callback
    return this
  }
  
  /**
   * @param {Function} callback
   * @param {String} name
   * @return {ApiObject}
   */
  callback(callback, name = 'default') {
    this._callbacks[name] = callback
    return this
  }
  
  /**
   * @param {*} mock
   * @param {Integer} timeout
   * @return {ApiObject}
   */
  mock(mock, timeout = 0) {
    this._mock = mock
    if (timeout) {
      this._mockTimeout = timeout
    }
    return this
  }
  
  /**
   * @param {Model} model
   * @return {ApiObject}
   */
  model(model) {
    this._model = model
    return this
  }
  
  /**
   * @param {Integer} version
   * @return {ApiObject}
   */
  v(version) {
    this._version = version
    return this
  }
  
  /**
   * @param {Object} data
   * @return {ApiObject}
   */
  data(data) {
    this._data = data
    return this
  }
  
  /**
   * @param {Object} query
   * @return {ApiObject}
   */
  query(query) {
    this._query = query
    return this
  }
  
  /**
   * @param {ApiParamsInterface} params
   * @return {ApiObject}
   */
  params(params) {
    $n.each(params, (value, key) => {
      if (this[key]) {
        this[key](value)
      }
    })
    
    return this
  }
  
  /**
   * @param {ApiParamsInterface} params
   * @return {ApiObject}
   */
  fromQuery(params) {
    return this.params(params)
  }
  
  /**
   * @param {Integer} page
   * @return {ApiObject}
   */
  page(page) {
    this._page = page
    return this
  }
  
  /**
   * @param {Integer} size
   * @return {ApiObject}
   */
  size(size) {
    this._size = size
    return this
  }
  
  /**
   * @param {String[]} sort
   * @return {ApiObject}
   */
  sort(sort) {
    this._sort = $n.merge(this._sort, sort)
    return this
  }
  
  /**
   * @param {String} search
   * @return {ApiObject}
   */
  search(search) {
    this._search = $n.merge(this._search, search)
    return this
  }
  
  /**
   * @param {Object} filters
   * @return {ApiObject}
   */
  filters(filters) {
    this._filters = $n.merge(this._filters, filters)
    return this
  }
  
  /**
   * @param {Object} relations
   * @return {ApiObject}
   */
  with(relations) {
    this._with = $n.merge(this._with, relations)
    return this
  }
  
  /**
   * @param {Array} fields
   * @return {ApiObject}
   */
  fields(fields) {
    this._fields = $n.merge(this._fields, fields)
    return this
  }
  
  /**
   * @param {Boolean} tree
   * @return {ApiObject}
   */
  tree(tree) {
    this._tree = tree
    return this
  }
  
  /**
   * @param {Boolean} all
   * @return {ApiObject}
   */
  all(all) {
    this._all = all
    return this
  }
  
  /**
   * @return {string}
   */
  getUrl() {
    let url = ''
    
    if ($n.isString(this._url)) {
      url = '/' + $n.trim(this._url, '/')
    } else { // [ 'users*/articles*', 1, 2] -> 'users/1/articles/2'
      const parts = this._url[0].split('*')
      const params = this._url.slice(1)
      $n.each(params, (item, index) => {
        if (item !== undefined) {
          parts[index] += `/${item}`
        }
      })
      url = '/' + $n.trim(parts.join(''), '/')
    }
    
    const version = this._version ? `/v${this._version}` : ''
    
    return version + url + this._serializeParams()
  }
  
  /**
   * @return {string}
   * @private
   */
  _serializeParams() {
    const filters = []
    
    if (this._page) {
      filters.push('page=' + this._page)
    }
    if (this._size) {
      filters.push('size=' + this._size)
    }
    if (this._sort.length) {
      const sort = $n.reduce(this._sort, (result, item) => {
        result.push(`sort[]=${item}`)
        return result
      }, []).join('&')
      if (sort) filters.push(sort)
    }
    if (this._search) {
      filters.push('search=' + this._search)
    }
    
    if (this._filters) {
      const fltrs = $n.reduce(this._filters, (result, item, name) => {
        result.push(`filter[${name}]=${item}`)
        return result
      }, []).join('&')
      if (fltrs) filters.push(fltrs)
    }
    
    if (this._with) {
      const withs = $n.reduce(this._with, (result, value, name) => {
        result.push(`with[${name}]`) // TODO доделать вложенность
        return result
      }, []).join('&')
      if (withs) filters.push(withs)
    }
    
    // TODO fields
    // TODO tree
    if (this._all) {
      filters.push('all')
    }
    // TODO query
    
    if (filters.length) {
      return '?' + filters.join('&')
    }
    return ''
  }
}
