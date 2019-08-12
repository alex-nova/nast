/**
 * Добавляет функцию hasModule в Vuex.Store.prototype
 *
 * @param {object} Vuex
 */
export function patchRegisterModule(Vuex) {
  const storeProto = Vuex.Store.prototype
    
  if ( !storeProto.hasModule ) {
    const registerModuleOriginal = storeProto.registerModule
    const unregisterModuleOriginal = storeProto.unregisterModule
    
    const pathToKey = (path) => {
      return path instanceof Array ? path.join('/') : path
    }
    
    storeProto.registerModule = function(path, rawModule, opts) {
      const pathKey = pathToKey(path)
      
      this.state._modules = this.state._modules || {}
      this._initialized = this._initialized || {}
      
      const stateExist = this.state._modules[pathKey]
      const gettersExist = this._initialized[pathKey]
      
      this.state._modules = {
        ...this.state._modules,
        [pathKey]: true,
      }
      this._initialized = {
        ...this._initialized,
        [pathKey]: true,
      }
      
      if (stateExist && gettersExist) {
        return false
      } else if (stateExist) {
        const options = {
          ...opts,
          preserveState: true,
        }
        return registerModuleOriginal.call(this, path, rawModule, options)
      }
      
      return registerModuleOriginal.call(this, path, rawModule, opts)
    }
    
    storeProto.unregisterModule = function(path, rawModule, opts) {
      const pathKey = pathToKey(path)
      
      this.state._modules = this.state._modules || {}
      this._initialized = this._initialized || {}
      this.state._modules = {
        ...this.state._modules,
        [pathKey]: false,
      }
      this._initialized = {
        ...this._initialized,
        [pathKey]: false,
      }
      
      return unregisterModuleOriginal.call(this, path, rawModule, opts)
    }
    
    storeProto.hasModule = function(path) {
      const pathKey = pathToKey(path)
      return this.state._modules[pathKey]
    }
  }
}
