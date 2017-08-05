const path = require('path')
const webpack = require('webpack')
const rm = require('rimraf')

const isProduction = process.env.NODE_ENV === 'production'
const bundlePath = path.join(process.cwd(), './dist')

module.exports = {
  entry: { index: './src/index.js' },
  output: {
    filename: '[name].bundle.js',
    path: bundlePath,
    publicPath: '/dist/'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        // add demo loader here
        loader: 'babel-loader!demo-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.join(process.cwd(), './src'), 'node_modules']
  },
  resolveLoader: {
    modules: ['node_modules', 'loaders']
  },
  performance: { hints: false },
  devtool: '#eval-source-map',
  devServer: {
    compress: true,
    port: 9000,
    noInfo: true,
    proxy: {}
  }
}

rm.sync(path.join(bundlePath, './*'))
if (isProduction) {
  module.exports.devtool = '#source-map'
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ])
}
