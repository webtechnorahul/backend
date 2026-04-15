import express from 'express';
import authRouter from './routers/auth.router.js';
import { connectDB } from './config/database.js';
import cookieParser from 'cookie-parser';
import { testAI } from './services/ai.services.js';
import cors from 'cors'
const app = express();

connectDB();
testAI()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/api/auth', authRouter);

export default app;