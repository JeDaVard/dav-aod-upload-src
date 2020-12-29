const AWS = require('aws-sdk');
const sharp = require('sharp');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    region: 'us-east-1'
})

function resizeStream(file, size) {
    return file.pipe(sharp().resize(size.w, size.h))
}

function uploadToS3(readableStream, filename, folder) {
    return s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: `${folder}/${filename}`,
        Body: readableStream
    }).promise()
}

module.exports = {
    uploadToS3,
    resizeStream
}
