import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { loginUser,registerUser } from "../services/auth.api";

export const useAuth = () => {
    const { loading,setloading, user, setuser } = useContext(AuthContext);
    const login = async (email, password) => {
        setloading(true);  
        try {
            const response = await loginUser(email, password);
            setuser(response.user)
        } catch (error) {
            console.log(error);
        } 
        finally{
            setloading(false);
        }
        
    }
    const register = async (username,email,mobile, password) => {
        setloading(true);
        try {
            const response = await registerUser(username,email,mobile, password);
            setuser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }

    return { loading, user, login, register };
}