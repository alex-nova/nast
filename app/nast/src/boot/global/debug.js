

export default () => {
  if (!$env.prod) {
    const debugTime = {}
    
    global.$debug = {
      start(name = 'default') {
        debugTime[name] = +new Date()
      },
      result(name = 'default') {
        console.warn(`Execution time of ${name} is ${+new Date() - debugTime[name]} ms`) // eslint-disable-line
      },
      stop(name = 'default') {
        console.warn(`Execution time of ${name} is ${+new Date() - debugTime[name]} ms. Stopped.`) // eslint-disable-line
        delete debugTime[name]
      },
    }
  }
  
  global.$debug = {
    start(name) {},
    result(name) {},
    stop(name) {},
  }
}
