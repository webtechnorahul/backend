const express=require('express')
const {identifyUser}=require('../middleware/identifyUser.middleware')
const userController=require('../controllers/user.controller')

const userRoute=express.Router()

userRoute.post('/user/follow/:followee',identifyUser,userController.userFollowRequest)
userRoute.post('/user/unfollow/:unfollowee',identifyUser,userController.userunFollow)
userRoute.post('/user/post/likes/:postId',identifyUser,userController.likePost)
userRoute.patch('/user/follow/accept/:follower',identifyUser,userController.acceptFollowUser)

module.exports=userRoute