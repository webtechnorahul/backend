import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import {useNavigate } from "react-router-dom";
import cookies from "js-cookie";
const Register = () => {
  const navigate=useNavigate()
    const {register,user,error,loading}=useAuth()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  // 🔁 Two-way binding
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.password || !form.role) {
      alert("All fields required!");
      return;
    }
    const response=await register({
        name:form.name,
        email:form.email,
        password:form.password,
        role:form.role
    })
    console.log(response)
    if(response){
        navigate('/login');
    }
  };

  
  const handleGoogle=async(e)=>{
    console.log("clicked")
  }
    const handleAuthStage=()=>{
      const token=cookies.get('token');
      if(token){
        navigate('/');
      }
    }
  
    useEffect(()=>{
      handleAuthStage();
    },[])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage:'url("https://avatars.mds.yandex.net/i?id=8ec4e9b8e60545eead3fad92b2b6c4b7c41d6955-5014002-images-thumbs&n=13")',backgroundSize: 'cover'}}>
      
      <div className="w-87.5 bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-6">
  
  <label
    className={`flex select-none items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer 
    ${form.role === "buyer" ? "border-indigo-500 border-2 bg-indigo-50 text-indigo-700 font-bold" : "border-gray-200 text-gray-500"}`}
  >
    <input
      type="radio"
      name="role"
      value="buyer"   // ⭐ IMPORTANT
      checked={form.role === "buyer"}
      onChange={handleChange}
      className="hidden"
    />
    Buyer
  </label>

  <label
    className={`flex select-none items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer 
    ${form.role === "seller" ? "border-indigo-500 border-2 bg-indigo-50 text-indigo-700 font-bold" : "border-gray-200 text-gray-500"}`}
  >
    <input
      type="radio"
      name="role"
      value="seller"   // ⭐ IMPORTANT
      checked={form.role === "seller"}
      onChange={handleChange}
      className="hidden"
    />
    Seller
  </label>

</div>

          <button disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50">
            {loading ? 'Registering...' : 'Register'}
          </button>

          <button
                      type="button"
                      onClick={handleGoogle}
                      className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg"
                    >
                      <FcGoogle size={20} />
                      Continue with Google
                    </button>

        </form>

        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account?
          <a href="/login" className="text-blue-600 font-bold ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;