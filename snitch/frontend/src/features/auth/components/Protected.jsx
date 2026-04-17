import React from 'react'
import cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const Protected = () => {
    const navigate=useNavigate();
    const token = cookies.get('token');

    const user=useSelector((state)=>state.auth.user);
    
    useEffect(()=>{
        if (!token) {
        navigate('/login');
    }
    },[])

  return (
    <>
    {
        <Outlet/>
    }
    </>
  )
}

export default Protected