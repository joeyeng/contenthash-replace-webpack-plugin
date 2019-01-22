'use strict';

const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const transform = require('./transform');

function ContentHashReplacePlugin(options) {
  this.src = options.src;
  this.dest = options.dest;
  this.files = options.files;
  this.format = options.format;
}

ContentHashReplacePlugin.prototype.apply = function (compiler) {
  const self = this;
  const folder = compiler.options.context;
  const src = path.join(folder, self.src);
  const dest = path.join(folder, self.dest);
  const filePaths = self.files;
  const format = self.format;

  fs.readFile(src, 'utf8', function (err, data) {
    compiler.plugin('done', function () {
      const files = filePaths.map(function (filePath) {
        const buffer = fs.readFileSync(filePath, 'utf8');
        return { filePath: filePath, contentHash: loaderUtils.getHashDigest(buffer) };
      });

      const template = fs.readFileSync(src, 'utf8');
      const htmlOutput = transform(template, format, files);
      fs.writeFileSync(dest, htmlOutput);
    });
  });
};

module.exports = ContentHashReplacePlugin;
