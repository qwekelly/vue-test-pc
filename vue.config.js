const cdnSettings = require('./cdn-settings')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: cdnSettings[process.env.ENV || 'dev'].publicPath,
  assetsDir: 'static',

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'routes': path.join(__dirname, 'src/routes')
      },
      unsafeCache: true,
      symlinks: false
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: !process.env.ENV || process.env.ENV === 'dev'
      })
    ]
  },

  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    const minimizer = config.optimization.store.get('minimizer')
    if (!minimizer) {
      return
    }
    const options = minimizer[0].options
    options.terserOptions.compress = {
      drop_console: false,
      drop_debugger: false
    }
    options.sourceMap = process.env.ENV !== 'online'
  }
}
