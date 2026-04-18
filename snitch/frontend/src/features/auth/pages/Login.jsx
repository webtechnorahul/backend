import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {login,googleLogin,loading}=useAuth();
  const navigate=useNavigate();
  // 🔁 Two-way binding
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email and Password required!");
      return;
    }
    const response=await login({email:form.email,password:form.password})
    if(response){
      navigate('/');
    }
  };

  const handleGoogle=async(e)=>{
    await googleLogin();
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
      
      <div className="w-87.5 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20" style={{background:"linear-gradient(to top left,#53587f 85%,black )"}}>
        
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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

          <button disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
          onClick={handleGoogle}
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </form>

        <p className="text-gray-300 text-sm text-center mt-4">
          Don't have an account?
          <a href="/register" className="text-blue-300 font-bold ml-1">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;