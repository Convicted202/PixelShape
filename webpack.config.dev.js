const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: [
    './src/polyfills/index.js',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 9090,
    open: true,
    contentBase: './src'
    // quiet: true
    //stats: 'errors-only',
  },
  watchOptions: {
    // Delay the rebuild after the first change
    aggregateTimeout: 300,
    // Poll using interval (in ms, accepts boolean too)
    poll: 1000
  },
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, 'src/libs')
      }
    ],
    loaders: [
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus'],
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.png$/,
        loader: 'file',
        query: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.woff/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
          mimetype: 'application/font-woff'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise/auto'
    }),
    new HtmlWebpackPlugin({
      title: 'PixelEdit',
      template: 'src/index.html',
      inject: 'body',
      cache: true
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify('develop')
    }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  worker: {
    output: {
      filename: "generateGif.worker.js",
      chunkFilename: "[id].generateGif.worker.js"
    }
  }
};

module.exports = config;
