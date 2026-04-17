import React,{ useEffect }  from 'react'
import { useSelector } from 'react-redux';
import cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const ProtectSellerRoute = () => {
    const {getCurrentUser,loading}=useAuth();
    const navigate = useNavigate();
    const token = cookies.get('token');
    const userfind=async()=>{
        if (!token) {
            navigate('/login');
        }
        const res=await getCurrentUser()
        console.log(res)
        if (res.role=='buyer') {
         navigate('/');
        }
    }

        useEffect(()=>{
            userfind();
        },[])
  return (
    <>
    {loading ? <div>Loading...</div> : <Outlet/>}
    </>
  )
}

export default ProtectSellerRoute