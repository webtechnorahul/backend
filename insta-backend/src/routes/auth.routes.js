const express=require('express')
const {identifyUser}=require('../middleware/identifyUser.middleware')
const authController = require('../controllers/auth.controller')
const authRoute=express.Router()


authRoute.post('/user/register',authController.createNewUser)
authRoute.post('/user/login',authController.userLogin)
authRoute.get('/user/get-me',identifyUser,authController.usergetMe)

module.exports=authRoute