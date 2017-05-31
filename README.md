Content Hash Replace Webpack Plugin
================================
[![Total Downloads](https://img.shields.io/npm/dt/contenthash-replace-webpack-plugin.svg)](https://npm-stat.com/charts.html?package=contenthash-replace-webpack-plugin)

This plugin works side by side with [ExtractTextPlugin](https://www.npmjs.com/package/extract-text-webpack-plugin) when using content hashes in filenames for caching.

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
    app: ['./src/main.js']
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
