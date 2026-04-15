const userModel = require('../models/user.model');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

// user register function
async function userRegisterController(req,res){
    const {username,email,password}=req.body;
    const isuserExist=await userModel.findOne({$or:[
        {username},{email}
    ]})
    if(isuserExist){
        if(isuserExist.username===username){
            return res.status(409).json({message:"user already exist"})
        }
        return res.status(409).json({message:"email already exist"})
    }
    const hashpassword=await bcrypt.hash(password,10)
    const user=await userModel.create({username,email,password:hashpassword})
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie("token",token,{expiresIn:'1h'})
    res.status(201).json({message:"user register successfully",user})
}

// user login controller function
async function userLoginController(req,res){
    const {email,password}=req.body;

    const isuserExist=await userModel.findOne({email})
    if(!isuserExist){
        return res.status(401).json({message:"email not register"})
    }
    const isMatch=await bcrypt.compare(password,isuserExist.password)
    if(!isMatch){
        return res.status(401).json({message:"password incorrect"})
    }
    const token=jwt.sign({
        id:isuserExist._id
    },process.env.JWT_SECRET_KEY)
    res.cookie("token",token)
    res.status(200).json({message:"login successfully"})
    
}


module.exports={
    userRegisterController,
    userLoginController
}