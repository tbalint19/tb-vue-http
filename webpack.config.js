const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

var commonConfig = {
  entry: path.resolve(__dirname + '/src/plugin.js'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'vue-http.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets:['vue', "@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        }],
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  externals: {
    'vue': 'vue',
    'popper.js': 'popper.js'
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin( {
  //     minimize : true,
  //     sourceMap : false,
  //     mangle: true,
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]
}

module.exports = [

  // Config 1: For browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'tb-vue-http.min.js',
      libraryTarget: 'window',
      library: 'VueHTTP'
    }
  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'tb-vue-http.js',
      libraryTarget: 'umd',

      // These options are useful if the user wants to load the module with AMD
      library: 'tb-vue-http',
      umdNamedDefine: true
    }
  })

]
