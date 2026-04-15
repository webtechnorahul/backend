const mongoose=require('mongoose')
const { applyTimestamps } = require('../../../../insta-backend/src/models/likes.model')

const likeSchema=mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:[true,"post is required to follow"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"userId id required to like the post"]
    }
},{
    timestamps:true
})
likeSchema.index({post:1,user:1},{unique:true})

const likeModel=mongoose.model("likes",likeSchema)

module.exports=likeModel