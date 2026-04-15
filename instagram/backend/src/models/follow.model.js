const mongoose=require('mongoose')

const followSchema=new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"follower is required"]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"followee is required"]
    },
    status:{
        type:String,
        default:'pending',
        enum:{
            values:["pending","accept","reject"],
            message:"status can be pending accept and reject only"
        }
    }
},{
    timestamps:true
})
followSchema.index({follower:1,followee:1},{unique:true})

const followModel=mongoose.model("follow",followSchema)

module.exports=followModel;