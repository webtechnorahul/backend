import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    verify:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    }
},{
    timestamps:true
});

const userModel=mongoose.model('users',userSchema);

export default userModel;