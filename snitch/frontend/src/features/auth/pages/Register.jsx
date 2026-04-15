import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import {useNavigate } from "react-router-dom";
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
    if(user){
      navigate('/')
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage:'url("https://avatars.mds.yandex.net/i?id=8ec4e9b8e60545eead3fad92b2b6c4b7c41d6955-5014002-images-thumbs&n=13")',backgroundSize: 'cover'}}>
      
      <div className="w-87.5 select-none backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20" style={{background:"linear-gradient(to top left,#53587f 85%,black )"}}>
        
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-6">
  
  <label
    className={`flex select-none items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-white
    ${form.role === "buyer" ? "border-green-500 border-2 bg-slate-700 " : "border-gray-600"}`}
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
    className={`flex select-none items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-white
    ${form.role === "seller" ? "border-green-500 border-2 bg-slate-700 " : "border-gray-600"}`}
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

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold">
            Register
          </button>

          <button
                      type="button"
                      className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg"
                    >
                      <FcGoogle size={20} />
                      Continue with Google
                    </button>

        </form>

        <p className="text-gray-300 text-sm text-center mt-4">
          Already have an account?
          <a href="/login" className="text-blue-300 font-bold ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;