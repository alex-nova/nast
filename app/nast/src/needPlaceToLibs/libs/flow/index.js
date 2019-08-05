import SWorker from 'simple-web-worker'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'
import each from 'lodash/each'


export default (func) => {
  const newFunc = (mainFunc, args, functions) => {
    const result = ''
    
    each(functions, (value, key) => {
      eval(`args${key} = ${functions[key]}`)
    })
    
    let argsForEval = []
    each(args, (value, key) => {
      argsForEval.push(`args[${key}]`)
    })
    argsForEval = argsForEval.join(',')
    
    eval(`result = (${mainFunc})(${argsForEval})`)
    
    return result
  }
  
  return (...args) => {
    const r = functionsToString(args)
    
    return SWorker.run(newFunc, [ func.toString(), r.collection, r.functions, ])
  }
}

/**
 *
 * @param {object} collection { 0: 'var', 1: 'var', 2: () => {}, }
 * @param {string} parentKey
 * @return {{functions: object, collection: object}}
 * functions - { ['2']: () => {},  }
 * collection - { 0: 'var', 1: 'var', 2: {}, }
 */
const functionsToString = (collection, parentKey = '') => {
  const functions = {}
  
  const newCollection = reduce(collection, (result, value, key) => {
    const stringKey = `${parentKey}['${key}']`
    
    if (isFunction(value)) {
      functions[stringKey] = value.toString()
    } else if (isObject(value) || isArray(value)) {
      const r = functionsToString(value, stringKey)
      result[key] = r.collection
      Object.assign(functions, r.functions)
    } else {
      result[key] = value
    }
    
    return result
  }, isArray(collection) ? [] : {})
  
  return { collection: newCollection, functions, }
}
