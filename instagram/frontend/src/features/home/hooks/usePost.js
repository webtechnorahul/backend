import { useContext } from "react";
import { postConext } from "../post.context";
import { getPost } from "../services/post.api";
export const usePost=()=>{
    const context=useContext(postConext);
    const {loading,setloading,allpost,setallpost}=context;
    const getAllpost=async()=>{
        setloading(true);
        try{
            const response=await getPost();
            setallpost(response.post);
        }
        catch(error){
            throw new error(Error.message);
        }
        finally{
            setloading(false);
        }
    }
    return{
        loading,allpost,getAllpost,setallpost
    }
}