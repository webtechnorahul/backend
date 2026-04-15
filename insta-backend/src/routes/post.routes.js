const express=require('express');
const postController = require('../controllers/post.controller');
const multer=require('multer');
const { identifyUser } = require('../middleware/identifyUser.middleware');

const postRoute=express.Router()
const upload=multer({storage:multer.memoryStorage()})


postRoute.post('/user/post',identifyUser,upload.single('image'),postController.createNewPost)
postRoute.get('/user/allpost',identifyUser,postController.allPost)
postRoute.get('/user/allpost/onepost/:postid',identifyUser,postController.getOnePost)
module.exports=postRoute