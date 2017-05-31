Content Hash Replace Webpack Plugin
================================
[![Build](https://travis-ci.org/giemch/contenthash-replace-webpack-plugin.svg?branch=master)](https://travis-ci.org/giemch/contenthash-replace-webpack-plugin)
[![Total Downloads](https://img.shields.io/npm/dt/contenthash-replace-webpack-plugin.svg)](https://npm-stat.com/charts.html?package=contenthash-replace-webpack-plugin)

This plugin is for transforming bundle references in your html files with cache friendly filenames using content hashes. It's meant to work side by side with [ExtractTextPlugin](https://www.npmjs.com/package/extract-text-webpack-plugin) (when using content hashes). Its main use is for processing css file references. Images should work too, but I haven't tested it. It was made generic enough to handle js bundle references as well, but as of this writing it appears using [contenthash] is not supported for naming js bundles.

**Tip**: Just use this plugin for your production/staging builds.

## Installation
```shell
$ npm install contenthash-replace-webpack-plugin --save-dev
```

## Example

### Webpack.config.js

```javascript
const path = require('path');
const ContentHashReplacePlugin = require('contenthash-replace-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/app.js']
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
      src: 'index.html',
      dest: 'dist/index.html',
      files: ['./css/app.css']
      format: '[name].[contenthash].[ext]'
    }),
    new ExtractTextPlugin('[name].[contenthash].css')
  ]
};
```
### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="/static/app.css" rel="stylesheet">
</head>
<body>
  <script src="/static/app.js"></script>
</body>
</html>
```

### app.js

```javascript
require('./app.css');
console.log('hello world!');
```

### Output

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="/static/app.a92b36339e7f9340ca152593ca9c81ba.css" rel="stylesheet">
</head>
<body>
  <script src="/static/app.js"></script>
</body>
</html>
```
