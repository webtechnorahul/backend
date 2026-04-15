import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required:function (){
            return !this.googleId;
        }
        
    },
    role:{
        type:String,
        require:false,
        default:"buyer"
    },
    googleId:{
        type:String,
    }
}, {
    timestamps: true
});

userSchema.index({})
const User = mongoose.model('User', userSchema);

export default User;