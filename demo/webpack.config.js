const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: ['babel-polyfill', resolve('src/index.js')],
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {},
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                resolve('src'),
            ]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]',
            }
        },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // NOTE: We have to use an absolute path for this because mutt-forms is a peerDependancy
      // it may not be found in the node_modules in the mutt-forms-vue build. so we must make
      // sure we pull it out of the app, which has Mutt set as a dependancy.
      // 'mutt-forms$': 'mutt-forms/dist/mutt-forms.es.js',
      '@mutt/forms$': resolve('node_modules/@mutt/forms/dist/mutt-forms.es.js'),
      '@mutt/widgets-vue$': resolve('../dist/mutt-forms-vue.es.js'),
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    disableHostCheck: true,
    host: '0.0.0.0',
  },
  devtool: '#eval-source-map',
}
