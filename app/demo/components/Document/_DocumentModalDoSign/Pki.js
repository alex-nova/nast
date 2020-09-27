/**
 *
 */
class Pki {
  _websocket = null
  
  _callback = (response) => {}
  
  _config = {
    onError: () => {},
    token: 'PKCS12',
  }
  
  tokens = {
    'PKCS12': 'Файловая система',
    'KZIDCARD': 'Удостоверение личности',
    'AKKZIDCardStore': 'Удостоверение личности',
    'KAZTOKEN': 'Казтокен',
    'AKKaztokenStore': 'Казтокен',
    'ETOKEN72K': 'eToken 72k',
    'AKEToken72KStore': 'eToken 72k',
    'JACARTA': 'JaCarta',
    'X509CERT': 'Сертификат X509',
    'AKEY': 'aKey',
    'ETOKEN5110': 'eToken 5110',
  }
  
  /**
   *
   */
  start() {
    this._websocket = new WebSocket('wss://127.0.0.1:13579/')
    this._websocket.onmessage = this._onMessage
    this._websocket.onclose = this._onClose
  }
  
  /**
   * @param {Object} params
   */
  config(params) {
    Object.keys(this._config).forEach((key) => {
      if (params[key] !== undefined) {
        this._config[key] = params[key]
      }
    })
  }
  
  /**
   * @param {Function} callback
   */
  getTokens(callback) {
    this._callback = (tokens) => {
      callback(tokens.reduce((result, item) => {
        result[item] = this.tokens[item] || item
        return result
      }, { 'PKCS12': 'Файловая система', }))
    }
  
    if (this._checkState()) {
      this._websocket.send(JSON.stringify({
        'module': 'kz.gov.pki.knca.commonUtils',
        'method': 'getActiveTokens',
      }))
    }
  }
  
  /**
   * @param {String} data
   * @param {Function} callback
   */
  sign(data, callback) {
    this._callback = callback
    
    
    if (this._checkState()) {
      this._websocket.send(JSON.stringify({
        'module': 'kz.gov.pki.knca.commonUtils',
        'method': 'signXml',
        'args': [ this._config.token, 'SIGNATURE', data, '', '', ],
      }))
    }
  }
  
  _checkState = () => {
    if (!this._websocket) {
      this._config.onError({ message: 'Ошибка инициализации', })
      return false
    }
    
    if (this._websocket.readyState === 1) {
      return true
    } else if (this._websocket.readyState === 0) {
      this._config.onError({ message: 'Инициализация еще не завершилась, попробуйте еще раз', })
    } else if (this._websocket.readyState === 3) {
      this._config.onError({ message: 'Пожалуйста, запустите программу и обновите страницу', })
    } else {
      this._config.onError({})
    }
    
    return false
  }
  
  _onMessage = (event) => {
    const result = JSON.parse(event.data)
    if (result['code'] === '500') {
      if (result.message === 'action.canceled') {
        return
      }
      this._config.onError(result)
    } else if (result['code'] === '200') {
      this._callback(result['responseObject'])
    }
  }
  _onClose = (event) => {
    if (event && event.code) {
      if (event.code !== 1006) {
        this._config.onError(event)
      }
    } else {
      const result = JSON.parse(event.data)
      this._config.onError(result)
    }
  }
}


export default new Pki
