const Busboy = require('busboy');
const uploadService = require('../services/uploads')

exports.upload = async (req, res) => {

    const busboy = new Busboy({ headers: req.headers });
    req.pipe(busboy);

    busboy.on('file', async function(_, file, filename, __, mimeType) {
        const type = mimeType.split('/')[0].toLocaleLowerCase();
        const isImage = type === 'image';

        if (!isImage) {
            await uploadService.uploadFile(file, filename);
            return res.status(201).json({success: true, message: 'The file was successfully uploaded' });
        }

        try {
            await uploadService.uploadImage(file, filename, mimeType);
            res.status(201).json({success: true, message: 'The image was successfully uploaded' });
        } catch (e) {
            res.status(400).json({ success: false, message: e.message });
        }
    });

    busboy.on('error', () => {
        res.status(500).json({success: false, message: 'Error while trying to upload' });
    });
};
