const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:[true,"username already exist"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exist"]
    },
    mobile:{
        type:String,
        required:[true,"mobile is required"],
        unique:[true,"mobile is already exist"],
        trim:true
    },
    profileImg:{
        type:String,
        default:'https://ik.imagekit.io/pfhclblv5/shared/usericon.png'
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    }
    },{
        timestamps:true
    })

    const userModel=mongoose.model('users',userSchema)

    module.exports=userModel

