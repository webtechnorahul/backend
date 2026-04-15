const mongoose=require('mongoose')

async function connectDB() {
    const connect=await mongoose.connect(process.env.MONGODB_URL);
    console.log("database is connect")
}
module.exports=connectDB