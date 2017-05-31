const path = require('path');

function transform(template, format, files) {
    let htmlOutput = template;

    for (let fileInfo of files) {
        const { filePath, contentHash } = fileInfo;
        const file = path.basename(filePath);
        const extension = file.split('.').slice(-1).join('');

        const fileName = file
            .split('.')
            .slice(0, -1)
            .join('')
            .replace(/[^a-z0-9_]/gi, '');

        const regex = new RegExp(`(["'].*)(${fileName}\\.${extension})(["'])`, 'i');

        const formattedFileName = format
            .replace(/\[name\]/i, fileName)
            .replace(/\[contenthash\]/i, contentHash)
            .replace(/\[ext\]/i, extension);

        htmlOutput = htmlOutput.replace(regex, `$1${formattedFileName}$3`);
    }

    return htmlOutput;
}

module.exports = transform;