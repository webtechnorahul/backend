const express=require('express')
const authController = require('../controllers/auth.controller')

const authRoute=express.Router()

authRoute.post('/login',authController.loginController)
authRoute.post('/register',authController.registerController)

module.exports=authRoute