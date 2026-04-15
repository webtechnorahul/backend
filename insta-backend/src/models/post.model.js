const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"image is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"user id is required to creating post"]
    }
})

const postModel=mongoose.model("post",postSchema)

module.exports=postModel;