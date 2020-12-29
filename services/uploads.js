const config = require("../config");
const { uploadToS3, resizeStream } = require("../utils");


exports.uploadFile = async (file, filename, ext) => {
    if (!config.allowed.includes(ext)) {
        throw Error('Wrong type');
    }

    uploadToS3(file, `${Date.now()}_${filename}`, 'files');
}

exports.uploadImage = async (file, filename, ext) => {
    if (!config.allowed.includes(ext)) {
        throw Error('Wrong type');
    }

    const largeImageStream = resizeStream(file, config.sizes.large, filename);
    const mediumImageStream = resizeStream(file, config.sizes.medium, filename);
    const thumbImageStream = resizeStream(file, config.sizes.thumb, filename);

    await Promise.all([
        uploadToS3(largeImageStream, `${config.sizes.large.w}_${Date.now()}_${filename}`, 'images'),
        uploadToS3(mediumImageStream, `${config.sizes.medium.w}_${Date.now()}_${filename}`, 'images'),
        uploadToS3(thumbImageStream, `${config.sizes.thumb.w}_${Date.now()}_${filename}`, 'images'),

    ])
}
