import { useDispatch } from "react-redux";
import { seterror,setloading,setuser } from "../auth.slice";
import { userLogin } from "../services/auth.api";

export const useAuth=()=>{
    const dispatch=useDispatch();
    
}
