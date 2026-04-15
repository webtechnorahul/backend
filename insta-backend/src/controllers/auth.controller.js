const userModel = require("../models/user.model");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


async function createNewUser(req,res) {
    const {username,email,mobile,password}=req.body;
    const isUserExist= await userModel.findOne({$or:[
        {username},{email},{mobile}
    ]})
    if(isUserExist){
        if(isUserExist.username===username){
            return res.status(409).json({message:"username is exist"})
        }
        else if(isUserExist.email===email){
           return res.status(409).json({message:"email is already register"})
        }
        else{
           return res.status(409).json({message:"mobile number is already register"})
        }
    }
    const hashPassword=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        email,
        mobile,
        password:hashPassword
    })
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('instaToken',token)
    res.status(201).json({message:"user create successfully"})

}

async function userLogin(req,res) {
    const {email,mobile,password}=req.body;
    const isUserExist=await userModel.findOne({$or:[
        {email},{mobile}
    ]})
    if(!isUserExist){
       return res.status(401).json({message:"email not register"})
    }
    const isVerify=await bcrypt.compare(password,isUserExist.password)
    if(!isVerify){
        return res.status(401).json({message:"password incorrect"})
    }
    const token=jwt.sign({
        id:isUserExist._id
    },process.env.JWT_SECRET)

    res.cookie('instaToken',token)
    res.status(200).json({message:'user login successfully',user:isUserExist})
    
}
async function usergetMe(req,res){
    const userID=req.user.id;
    const userData=await userModel.findById(userID)
    res.status(200).json({
        user: {
            username: userData.username,
            email: userData.email,
            mobile:userData.mobile
        }
    })

}

module.exports={
    userLogin,
    createNewUser,
    usergetMe
}