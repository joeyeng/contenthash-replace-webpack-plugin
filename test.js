const transform = require('./transform');
const assert = require('assert');

describe('ChunkHashReplacePlugin', () => {
    it('should transform single bundle', function () {
        const contentHash = '1234567';
        const files = [{ filePath: './src/css/app.css', contentHash: contentHash }]
        const html = '<link href="app.css" rel="stylesheet">';
        const format = '[name].[contenthash].[ext]';
        assert.equal(transform(html, format, files), `<link href="app.${contentHash}.css" rel="stylesheet">`);
    });

    it('should transform relative path bundle', function () {
        const contentHash = '1234567';
        const files = [{ filePath: './src/css/app.css', contentHash: contentHash }]
        const html = '<link href="/static/app.css" rel="stylesheet">';
        const format = '[name].[contenthash].[ext]';
        assert.equal(transform(html, format, files), `<link href="/static/app.${contentHash}.css" rel="stylesheet">`);
    });

    it('should ignore format case', function () {
        const contentHash = '1234567';
        const files = [{ filePath: './src/css/app.css', contentHash: contentHash }]
        const html = '<link href="app.css" rel="stylesheet">';
        const format = '[NaMe].[CoNtEnThAsH].[eXt]';
        assert.equal(transform(html, format, files), `<link href="app.${contentHash}.css" rel="stylesheet">`);
    });
});