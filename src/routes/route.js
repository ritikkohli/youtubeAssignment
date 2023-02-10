const express = require('express')
const router = express.Router()
const {fetchVideos, getVideos} = require('../controller/youtubeController')

router.get('/getVideo',getVideos)
router.get('/',fetchVideos)

module.exports = router