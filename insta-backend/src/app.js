require('dotenv').config()
const express=require('express');
const cors=require('cors')
const authRoute = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const postRoute = require('./routes/post.routes');
const userRoute = require('./routes/user.route');


const app=express();
const corsOptions = {
    // 1. Replace '*' with your specific frontend URL
    origin: 'http://localhost:5173', 
    
    // 2. Allow cookies/headers to be sent
    credentials: true,               
    
    optionsSuccessStatus: 200
};

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/insta",authRoute)
app.use('/insta',postRoute)
app.use('/insta',userRoute)

module.exports=app