const express=require('express');
const authUserRoutes = require('../routes/auth.route');

const app=express()

app.use(express.json())
app.use('/auth',authUserRoutes)

module.exports=app