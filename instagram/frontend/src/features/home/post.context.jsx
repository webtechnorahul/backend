import { createContext, useState } from "react";
export const postConext=createContext();

export const PostProvider=({children})=>{
    const [loading, setloading] = useState(false);
    const [allpost, setallpost] = useState(null);
    return(
        <postConext.Provider value={{loading,setloading,allpost,setallpost}}>
            {children}
        </postConext.Provider>
    )
}