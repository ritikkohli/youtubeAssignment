const videoModel = require("../models/videoModel.js")
const axios = require('axios')

const fetchVideos = async function(req,res){
    try{
        let p = await axios.get("https://www.googleapis.com/youtube/v3/search/?key=AIzaSyB43Sc-ROSS8MRvMd0ErnVIAk2C-8olpZ8&type=video&publishedAfter=2023-01-01T07:20:50.52Z&q=gamimg&part=snippet")
        async function fetch(){
            for(let i=0;i<5;i++){
                let v = p.data.items[i].snippet
                let video = {
                    title : v.title,
                    description : v.description,
                    publishDate : v.publishedAt,
                    thumbnails : v.thumbnails.medium.url,
                    channelTitle : v.channelTitle,
                }        
                await videoModel.create(video)
            }
        }
        setInterval(fetch,10000)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const getVideos = async function(req,res){
    try{
        let {channel} = req.query
        let condition = {}
        if(channel){
            condition.channelTitle = channel
        }
        let videos = await videoModel.find(condition).sort({publishDate:-1})
        if(videos.length == 0) return res.status(400).send({message:"no data match"})
        res.status(200).send({message:"success", data:videos})
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

module.exports = {fetchVideos, getVideos} 