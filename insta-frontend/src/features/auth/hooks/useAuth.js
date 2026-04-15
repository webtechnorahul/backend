import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { userLogin,userRegister,userGetMe } from "../services/auth.api";

export const useAuth=()=>{
    const context=useContext(AuthContext);
    const {user,setuser,loading,setloading}=context;

    const handleLogin=async(email,password)=>{
        setloading(true);
        const response=await userLogin(email,password);
        setuser(response.user)
        setloading(false)

    }
    const handleRegister=async(username,email,mobile,password)=>{
        setloading(true);
        const response=await userRegister(username,email,mobile,password);
        setuser(response.user);
        setloading(false);
    }

    return{
        user,loading,handleLogin,handleRegister
    }

}