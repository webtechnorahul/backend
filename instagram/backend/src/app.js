require('dotenv').config()
const express=require('express')
const cors=require('cors')
const authRoute = require('./routes/auth.routes')
const cookieParser=require('cookie-parser')
const postRoute = require('./routes/post.routes')
const { identifyUser } = require('./middleware/indentifyUser.middleware')
const userRoute = require('./routes/user.routes')
const app=express()


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true                // Allows cookies/headers to be sent
}))


app.use('/instagram/user',authRoute)
app.use('/instagram/user',identifyUser,postRoute)
app.use('/instagram/user',identifyUser,userRoute)


module.exports=app