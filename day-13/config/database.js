const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("database is connected")
    })
}

module.exports=connectDB