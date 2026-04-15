import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/form.css'
import { userLogin } from "../services/auth.api";
const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  async function handleForm(e) {
    e.preventDefault();
    await userLogin(email,password);
    
  }
  return (
    <main >
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleForm}>
          <input onChange={(e)=>{
            setemail(e.target.value)
          }} value={email} type="text" placeholder="enter email" name="email" id="email"/>
          <input onChange={(e)=>{
            setpassword(e.target.value)
          }} value={password} type="text" placeholder="enter password" name="password" id="password"/>
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </main>
  );
};

export default Login;