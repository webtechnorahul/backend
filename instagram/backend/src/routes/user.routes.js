const express=require('express')
const userController=require('../controllers/user.controller')
const userRoute=express.Router();

userRoute.post('/follow/:followeeId',userController.followNewUser)


module.exports=userRoute