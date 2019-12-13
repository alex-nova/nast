
module.exports = {
  publicPath: '',
  outputDir: 'public',
  assetsDir: 'assets',
  
  pluginOptions: {
    nast: {
      appDir: 'app/demo',
      configDir: 'a', // относительно appDir без начального слеша
    },
  },
}
