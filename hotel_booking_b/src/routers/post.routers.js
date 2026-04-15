const express=require('express')
const postController=require('../controllers/post.controller')
const postRouter=express.Router()
// api are  http://localhost:3000/hotel/user/post
postRouter.post('/post',postController.createPostController)

// get method http://localhost:3000/hotel/user/allpost
postRouter.get('/allpost',postController.getAllPostController)

// get method http://localhost:3000/hotel/user/post/:id

postRouter.get('/post/:postid',postController.getOnePostController)

module.exports=postRouter