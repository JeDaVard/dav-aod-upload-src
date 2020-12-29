const { Router } = require('express')
const { upload: uploadController } = require('../controllers/uploads')

const router = Router()

router.post('/upload', uploadController)

module.exports = router
