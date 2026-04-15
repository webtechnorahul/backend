const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username already exist"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is already register"]
    },
    mobile:{
        type:Number,
        require:[true,"mobile number is required"],
        unique:[true,"mobile number is exist"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
})

const userModel=mongoose.model('users',userSchema)

module.exports=userModel