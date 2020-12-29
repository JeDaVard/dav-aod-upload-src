const { Router } = require('express')
const {
    upload: uploadController,
    formUpload: formUploadController} = require('../controllers/uploads')

const router = Router()

router.post('/raw/:filename', uploadController)
router.post('/form-upload', formUploadController)

module.exports = router
