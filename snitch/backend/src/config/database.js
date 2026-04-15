import mongoose from 'mongoose';
import { config } from './config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
    }
};

export default connectDB;