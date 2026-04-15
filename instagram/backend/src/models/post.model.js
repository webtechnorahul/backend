const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    imageUrl:{
        type:String,
        required:[true,"image url is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,"user login is required or user id is required to create post"]
    }
})
const postModel=mongoose.model('posts',postSchema)
module.exports=postModel