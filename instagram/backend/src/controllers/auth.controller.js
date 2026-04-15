const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userModel = require("../models/auth.model");

async function registerController(req,res) {
    const {username,fullname,email,mobile,password,profileImg}=req.body;

    const isUserExist=await userModel.findOne({$or:[
        {username},{email},{mobile}
    ]})
    if(isUserExist){
        if(isUserExist.username===username){
            return res.status(409).json({message:"username is already exist"})
        }
        else if(isUserExist.email===email){
            return res.status(409).json({message:"email is already register"})
        }
        else{
            return res.status(409).json({message:"mobile number is used"})
        }
    }
    const hashPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,fullname,email,mobile,password:hashPassword,profileImg
    })
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token);
    res.status(201).json({message:"user register successfully",user})
}
async function loginController(req,res) {
    const {email,password}=req.body;
    let isUserExist;
    isUserExist=await userModel.findOne({email}).select('+password')
    
    if(!isUserExist){
        return res.status(404).json({message:`email is not register`})
    }
    const isVerify=await bcrypt.compare(password,isUserExist.password)
    if(!isVerify){
        return res.status(401).json({message:"password is incorrect"})
    }
    const token=jwt.sign({
        id:isUserExist._id
    },process.env.JWT_SECRET,{
      expiresIn:'1w'
    })

    res.cookie('token',token)

    res.status(200).json({message:"user login successfully",user:isUserExist})
}


// async function logoutController(req,res){
    
// }


module.exports={
    loginController,
    registerController
}