const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title : {type : String},
    description : {type : String},
    publishDate : {type : Date},
    thumbnails : {type : String},
    channelTitle : {type : String},
})

module.exports = mongoose.model('Video',videoSchema)