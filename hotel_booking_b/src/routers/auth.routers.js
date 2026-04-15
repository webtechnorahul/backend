const express=require('express');
const authRouter=express.Router()
const authController=require('../controllers/auth.controller')
authRouter.post('/register',authController.userRegisterController)

authRouter.post('/login',authController.userLoginController)


module.exports=authRouter