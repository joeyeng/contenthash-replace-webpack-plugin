const path = require('path');
const ContentHashReplacePlugin = require('../');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
  entry: {
    app: ['./sample/app.js']
  },
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: '[name].js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ContentHashReplacePlugin({
      src: './sample/index.html',
      dest: './sample/dist/index.html',
      files: ['./sample/app.css'],
      format: '[name].[contenthash].[ext]'
    }),
    new ExtractTextPlugin('[name].[contenthash].css')
  ]
};