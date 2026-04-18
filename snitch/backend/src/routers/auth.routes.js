import express from 'express';
import { register, login, getuser } from '../controllers/auth.controller.js';
import {validateLoginUser,validateRegisterUser} from '../validator/auth.validator.js'
import passport from 'passport';
import { config } from '../config/config.js';
import userModel from '../models/user.model.js';
import jwt from "jsonwebtoken"
import { isTokenValid } from '../middleware/auth.middlewale.js';
const router = express.Router();

router.post('/register',validateRegisterUser, register);
router.post('/login',validateLoginUser, login);
router.get('/getuser',isTokenValid,getuser)
router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    res.json({message:"Logged out successfully"})
})

router.get("/google",
    passport.authenticate("google",{scope:["profile","email"]})
)

router.get("/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
}),async (req,res)=>{
    
    const email=req.user.emails[0].value
    const id=req.user.id;
    const Fullname=req.user.displayName;
    // console.log(email,"    ",id,"    ",name)
    let user=await userModel.findOne({email});
    if(!user){
        user=await userModel.create({
            email:email,
            googleId:id,
            name:Fullname
        })
    }
    const token=jwt.sign({
        id:user._id
    },config.JWT_SECRET_KEY,{
        expiresIn:'7d'
    });
    res.cookie("token",token)
    res.redirect('http://localhost:5173/') // redirect to frontend after successful login;
})

export default router;