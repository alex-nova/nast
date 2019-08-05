import StorePluginInterface from '../../StorePluginInterface'
import storeModule from './store/content'

/**
 *
 * @type {{} & {init, getter, dispatch, moduleName, commit, store, state, register} & {setToStorage(), init({store: *, storage: *}): void,
 * contentItem: {}, updateNames(*=): void, fetch(), moduleName: string, store: {}, storage: {}}}
 */
const PluginContent = Object.assign({}, StorePluginInterface, {
  storage: {},
  auth: {},
  
  init({ store, storage, auth, moduleName = 'api/content', }) {
    this.store = store
    this.storage = storage
    this.auth = auth
    this.storeModule = storeModule
    this.moduleName = moduleName
    
    this.register()
    
    return this
  },
  
  setItem({
    name,
    data = this.state()[name]['data'],
    ok = this.state()[name]['ok'],
    status = this.state()[name]['status'],
    updatedAt = this.state()[name]['updatedAt'],
    outdatedAt = this.state()[name]['outdatedAt'],
  }, withStorage = false) {
    const value = {
      name, data, ok, status, updatedAt, outdatedAt,
    }
    this.commit('set', { name, value, })
    
    if (withStorage) {
      return this.storage.set(name, {
        data: value.data,
        updatedAt: value.updatedAt.format(),
      })
    }
    
    return new Promise((resolve) => resolve())
  },
  
  /**
   *
   * @param {array} apis - [  { name: '', api: () => {}, access: [], refreshTime: 10(in seconds), }, ]
   */
  updateNames(apis) {
    const names = $n.reduce(apis, (result, data, name) => {
      const can = this.auth.can(data.access)
      if (can) {
        result.push(name)
      }
      return result
    }, [])
    
    const allNames = $n.merge(Object.keys(this.state()), names)
    $n.each(allNames, (name) => {
      if (!this.state()[name]) {
        this.setItem({
          name,
          data: [],
          ok: false,
          status: 'loading',
          updatedAt: $app.date().add(-1, 'y'),
          outdatedAt: $app.date(),
        })
      } else if (!names.includes(name)) {
        this.commit('delete', { name, })
      }
    })
  },
  
  /**
   *
   * @param {object} api - { name: '', api: () => {}, access: [], refreshTime: 10(in seconds), }
   * @return {Q.Promise<any> | * | Promise<T | never>}
   */
  fetch(api) {
    const name = api.name
    const outdatedAt = $app.date().add(api.refreshTime || $app.config('api.refreshTime'), 's')
    
    this.setItem({
      name,
      ok: false,
      status: 'loading',
    })
  
    return api.api().then((response) => {
      const value = {
        name,
        data: response.data.data,
        ok: true,
        status: '',
        updatedAt: $app.date(),
        outdatedAt,
      }
  
      this.setItem(value, true).then(() => {
        return true
      })
    }).catch((e) => {
      const status = e.message === 'Network Error' ? 0 : $n.get(e, 'response.code', -1)
      let value
    
      if ($n.size(this.state()[name].data)) {
        value = { name, ok: true, status: '', outdatedAt, }
      } else if (status === 0) {
        value = { name, data: [], ok: false, status: 'noConnection', outdatedAt, }
      } else {
        value = { name, data: [], ok: false, status: 'error', outdatedAt, }
      }
    
      return this.setItem(value, true).then(() => {
        return status
      })
    })
  },
})

export default PluginContent
