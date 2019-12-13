

export default () => {
  if (!$env.prod) {
    const debugTime = {}
    
    global.$debug = {
      start(name = 'default') {
        debugTime[name] = +new Date()
      },
      result(name = 'default') {
        console.warn(`Execution time of ${name} is ${+new Date() - debugTime[name]} ms`) // eslint-disable-line no-console
      },
      stop(name = 'default') {
        console.warn(`Execution time of ${name} is ${+new Date() - debugTime[name]} ms. Stopped.`) // eslint-disable-line no-console
        delete debugTime[name]
      },
      log(...args) {
        console.log(...args) // eslint-disable-line no-console
      },
      warn(...args) {
        console.warn(...args) // eslint-disable-line no-console
      },
      error(...args) {
        console.error(...args) // eslint-disable-line no-console
      },
    }
  } else {
    global.$debug = {
      start(name) {},
      result(name) {},
      stop(...args) {},
      log(...args) {},
      warn(...args) {},
      error(...args) {},
    }
  }
}
