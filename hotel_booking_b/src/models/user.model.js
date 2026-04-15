const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name already register"],
        require:true
    },
    email:{
        type:String,
        unique:[true,"email is already register"],
        require:true
    },
    password:String,
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel;