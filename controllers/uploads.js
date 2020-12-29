const Busboy = require('busboy');
const config = require('../config')
const uploadService = require('../services/uploads')


exports.upload = async (req, res) => {
    const [ type, ext ] = req.headers['content-type'].split('/');
    const contentLength = req.headers['content-length'];
    const { filename } = req.params;
    const isImage = type === 'image';

    try {
        if (contentLength > config.fileSize) {
            return res.status(400).json({ success: false, message: 'Wrong file size' });
        }

        if (!isImage) {
            await uploadService.uploadFile(req, `${filename}.${ext}`, ext);
            return res.status(201).json({success: true, message: 'The file was successfully uploaded' });
        }

        await uploadService.uploadImage(req, `${filename}.${ext}`, ext);
        res.status(201).json({success: true, message: 'The image was successfully uploaded' });
    } catch (e) {
        res.status(400).json({ success: false, message: 'Wrong file format' });
    }
};

exports.formUpload = async (req, res) => {
    const fileSize = config.fileSize;

    const stream = new Busboy({headers: req.headers, limits: { files: 1, fileSize } });
    req.pipe(stream);

    stream.on('file', async function(_, fileStream, filename, __, mimeType) {
        const [ type, ext ] = mimeType.split('/')
        const isImage = type === 'image';

        try {
            if (!isImage) {
                await uploadService.uploadFile(fileStream, filename, ext);
                return res.status(201).json({success: true, message: 'The file was successfully uploaded' });
            }

            await uploadService.uploadImage(fileStream, filename, ext);
            res.status(201).json({success: true, message: 'The image was successfully uploaded' });
        } catch (e) {
            res.status(400).json({ success: false, message: 'Wrong file size or format' });
        }
        res.send()
    });

    stream.on('error', () => {
        res.status(500).json({success: false, message: 'Error while trying to upload' });
    });
};
