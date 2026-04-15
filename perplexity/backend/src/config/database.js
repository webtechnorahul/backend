import mongoose from 'mongoose';
import 'dotenv/config';

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database is connected successfully");
    }
    catch(error){
        return console.log("database connection error",error);
    }
}