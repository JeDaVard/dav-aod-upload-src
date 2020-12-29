const imageConfig = require("../config");
const { uploadToS3, resizeStream } = require("../utils");


exports.uploadFile = async (file, filename) => {
    uploadToS3(file, `${Date.now()}_${filename}`, 'files');
}

exports.uploadImage = async (file, filename, mimeType) => {
    const ext = mimeType.split('/')[1].toLocaleLowerCase();
    if (!imageConfig.allowed.includes(ext)) {
        throw Error('Wrong type');
    }

    const largeImageStream = resizeStream(file, imageConfig.sizes.large, filename);
    const mediumImageStream = resizeStream(file, imageConfig.sizes.medium, filename);
    const thumbImageStream = resizeStream(file, imageConfig.sizes.thumb, filename);

    await Promise.all([
        uploadToS3(largeImageStream, `${imageConfig.sizes.large.w}_${Date.now()}_${filename}`, 'images'),
        uploadToS3(mediumImageStream, `${imageConfig.sizes.medium.w}_${Date.now()}_${filename}`, 'images'),
        uploadToS3(thumbImageStream, `${imageConfig.sizes.thumb.w}_${Date.now()}_${filename}`, 'images'),

    ])
}
