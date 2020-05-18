
module.exports = {
  publicPath: '/',
  outputDir: 'public',
  assetsDir: 'assets',
  runtimeCompiler: true, // если надо компилить строку в vue компоненты
  
  pluginOptions: {
    nast: {
      appDir: 'app/demo',
      configDir: 'config', // относительно appDir без начального слеша
    },
  },
}
