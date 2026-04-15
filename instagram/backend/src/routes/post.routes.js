const express=require('express')
const { identifyUser } = require('../middleware/indentifyUser.middleware')
const PostController=require('../controllers/post.controller')
const postRoute=express.Router()
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})

postRoute.post('/post',upload.single('image'),PostController.createPost)
postRoute.get('/allpost',PostController.getAllPost)
postRoute.post('/post/like/:postId',PostController.likePost)

module.exports=postRoute