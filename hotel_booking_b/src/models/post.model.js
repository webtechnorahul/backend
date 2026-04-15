const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        require:[true,"image is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:[true,"user id is required for creating post"]
    }
})
const postModel=mongoose.model('posts',postSchema)

module.exports=postModel;