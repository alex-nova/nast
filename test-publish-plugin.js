const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')


const dir = 'node_modules/vue-cli-plugin-nast'

clearDir(dir)
setTimeout(() => {
  initializeDir(dir)
})


/**
 * @param {string}dir
 */
function clearDir(dir) {
  rimraf.sync(dir)
}

/**
 * @param {string}dir
 */
function initializeDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(`${dir}`, { recursive: true, })
  }
  copyFiles('./app/vue-cli-plugin-nast', `./${dir}`)
}

/**
 * @param {string}source
 * @param {string}target
 * @param {boolean}withRoot
 */
function copyFiles(source, target, withRoot = false) {
  let files = []
  
  const targetFolder = withRoot ? path.join(target, path.basename(source)) : target
  if (withRoot && !fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }
  
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function(file) {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFiles(curSource, targetFolder, true)
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file))
      }
    })
  }
}
