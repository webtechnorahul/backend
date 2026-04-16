import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';


export const register = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        console.log({name,email,password,role})
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword,role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully',user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'wrong password enter or Invalid credentials' });
        const token = jwt.sign({ id: user._id }, config.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.cookie("token",token)

        res.status(200).json({message:"login successfull",user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getuser=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        res.status(200).json({user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}