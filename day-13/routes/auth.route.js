const express=require('express');
const userModel = require('../models/user.model');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const cookie=require('cookie-parser')

const authUserRoutes=express()

authUserRoutes.post('/user/register',async(req,res)=>{
    const {name,email,password}=req.body;
    const isUser=await userModel.findOne({email});
    if(isUser){
        return res.send("email is already register");
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser=await userModel.create({name,email,password:hashPass})

    const token=jwt.sign({
        id:newUser._id
    },process.env.JWT_SECRET)
    res.cookie("jwt-token",token)

    res.status(201).json({message:"register successfully",newUser,token})
})

authUserRoutes.post('/user/login',async(req,res)=>{
    const {email,password}=req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered"
      });
    }
    const ismatch=await bcrypt.compare(password,user.password);
    if (!ismatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.clearCookie("jwt-token");
    res.cookie('jwt-token',token)

    // login success
    res.status(200).json({
      message: "Login successful",
      user
    });

})

module.exports=authUserRoutes