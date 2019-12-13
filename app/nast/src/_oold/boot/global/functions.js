import { mapState, mapGetters, mapMutations, mapActions, } from 'vuex/types'
import each from 'lodash/each'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import reject from 'lodash/reject'
import merge from 'lodash/merge'
import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'
import pull from 'lodash/pull'
import includes from 'lodash/includes'
import concat from 'lodash/concat'
import assign from 'lodash/assign'
import size from 'lodash/size'
import invert from 'lodash/invert'
import values from 'lodash/values'
import reverse from 'lodash/reverse'
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import defer from 'lodash/defer'
import delay from 'lodash/delay'
import random from 'lodash/random'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import shuffle from 'lodash/shuffle'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'


const setInRange = (value, a, b) => {
  const min = a < b ? a : b
  const max = a > b ? a : b
  
  if (value < min) return min
  if (value > max) return max
  
  return value
}

const mapDeep = (container, childrenName, callback, deep = 0) => {
  return map(container, (cont) => {
    cont = clone(cont)
    let children = cont[childrenName]
    if (isArray(children) || isObject(children)) {
      children = mapDeep(children, childrenName, callback, deep)
    }
    if (children !== undefined) {
      cont[childrenName] = children
    }
    return callback(cont)
  })
}

const reduceDeep = (container, childrenName, callback, accumulator, parentData) => {
  return reduce(container, (result, cont, key) => {
    let _parentData = clone(parentData)
    const data = (d) => {
      if (d === undefined) return _parentData
      _parentData = d
    }
    result = callback(result, cont, key, data)
    const children = cont[childrenName]
    if (isArray(children) || isObject(children)) {
      result = reduceDeep(children, childrenName, callback, result, _parentData)
    }
    return result
  }, accumulator)
}

const objectPromiseAll = (object) => {
  const promisedProperties = []
  const objectKeys = Object.keys(object)
  
  objectKeys.forEach((key) => promisedProperties.push(object[key]))
  
  return Promise.all(promisedProperties)
    .then((resolvedValues) => {
      return resolvedValues.reduce((resolvedObject, property, index) => {
        resolvedObject[objectKeys[index]] = property
        return resolvedObject
      }, object)
    })
}

const isPromise = (obj) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}


export default () => {
  global.$n = {
    each,
    map,
    reduce,
    find,
    filter,
    reject,
    merge,
    get,
    set,
    unset,
    pull,
    includes,
    concat,
    assign,
    size,
    invert,
    values,
    reverse,
    clone,
    cloneDeep,
    defer,
    delay,
    random,
    sortBy,
    shuffle,
    debounce,
    throttle,
    isEqual,
    isObject,
    isArray,
    isFunction,
    isString,
    isBoolean,
  
    setInRange,
    mapDeep,
    reduceDeep,
    isPromise,
    objectPromiseAll,
  
    mapState,
    mapGetters,
    mapMutations,
    mapActions,
  }
}
