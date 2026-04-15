import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routers/auth.routes.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as GoogleStratergy } from 'passport-google-oauth20';
import { config } from './config/config.js';
import morgan from 'morgan'
import productRouter from './routers/product.routes.js';
dotenv.config();


connectDB();
const app = express();

app.use(passport.initialize());

passport.use(new GoogleStratergy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:'/api/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    return done(null,profile)
}))
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))

app.get('/',(req,res)=>{
    res.send(`<h1>home page</h1>`)
})

app.use('/api/auth', authRoutes);
app.use('/api/products',productRouter);

export default app;