
module.exports = {
  publicPath: '/',
  outputDir: 'public',
  assetsDir: 'assets',
  
  pluginOptions: {
    nast: {
      appDir: 'app/demo',
      configDir: 'config', // относительно appDir без начального слеша
    },
  },
}
