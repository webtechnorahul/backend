import { sendEmail } from "../services/mail.services.js";
import bcrypt from 'bcryptjs';
import userModel from "../models/auth.model.js";
import jwt from 'jsonwebtoken';

export async function userRegister(req,res) {

    const {username,email,password}=req.body;
    const isUserExist=await userModel.findOne({$or:[
        {email},{username}
    ]})
    if(isUserExist){
        return res.send({message:"user already exist",success:false,error:isUserExist.email===email?"email already exist":"username already exist"})
    }
    const hashPassword=await bcrypt.hash(password,10);
    const newUser=await userModel.create({
        username,email,password:hashPassword
    })
    await sendEmail(
        {
            to:email,
            subject:'welcome to perplexity',
            html:`<p>hi ${username},<p>
            <p>Thank you for register in <strong>perplexity</strong>.we're exicted to have you to join in team</p>\n\n
            <p> we are glad to have you on board</p>\n\n\n
            <a href="http://localhost:3000/api/auth/verify-user?email=${email}">Email verify</a>\n\n
            <h5>Best Regards</h5>
            <p>perplexity team</p>
            `  
        }
    )
    res.status(201).json({message:"user create successfully",success:true})
}

export async function userLogin(req,res){
    const {email,password}=req.body;

    const isUserExist=await userModel.findOne({email}).select('+password');
    if(!isUserExist){
        return res.status(404).json({message:"user not register",success:false})
    }
    if(!isUserExist.verify){
        return res.status(403).json({message:"email not verify"})
    }
    const isVerify = await bcrypt.compare(password, isUserExist.password);
    if (!isVerify) {
        return res.status(403).json({ message: "unauthorized access", success: false });
    }
    const token=jwt.sign({
        id:isUserExist._id,
    },process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    res.cookie("token",token);
    res.json({message:"login successful",success:true,user:{
        id:isUserExist._id,
        username:isUserExist.username,
        email:isUserExist.email
    }})
}

export async function verifyUser(req,res) {
    const {email}=req.params;
    const user=await userModel.findOne(email);
    if(!user){
        return res.status(404).json({message:"user not registered",success:false})
    }
    user.verify = true;
    await user.save();
    res.send(`<h1> email is verify successfully</h1> 
        <A href="http://localhost:3000/api/auth/login">click here to login</A>`);
}