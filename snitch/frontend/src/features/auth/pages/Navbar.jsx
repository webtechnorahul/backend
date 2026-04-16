import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
const Navbar = () => {
  const navigate=useNavigate();
  const {getCurrentUser,user}=useAuth();
  
  const handleuser=async ()=>{
    const res=await getCurrentUser()
    console.log(res)
    if(!res){
      navigate('/login');
    }
  }
  useEffect(() => {
    handleuser();
  }, []);

  return (
    <div>
      {user ? (
        <h3>Welcome, {user.name}</h3>
      ) : (
        <h3>Please Login</h3>
      )}
    </div>
  );
};

export default Navbar