const express=require('express');
const authRouter = require('./routers/auth.routers');
const postRouter = require('./routers/post.routers');
const cookieParser=require('cookie-parser')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})

const app=express();

app.use(express.json())
app.use(cookieParser())
app.use('/hotel/user',authRouter)
app.use('/hotel/user',upload.single('image'),postRouter)
module.exports=app