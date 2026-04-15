import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Form.scss'
import { useAuth } from '../hooks/useAuth'
const Login = () => {
  const {user,loading,login}=useAuth()
  const [email, setemail] = useState('')
  const [mobile, setmobile] = useState('')
  const [password, setpassword] = useState('')
  const navigate=useNavigate();
  async function formSubmit(e){
    e.preventDefault();
    try{
      await login(email,password);
      navigate('/');
    }
    catch(err){
      console.log(err);
      navigate('/login');
      throw new Error(err);
      
    }
    
    
  }
  if(loading){
    return(<main><h1>loading....</h1></main>)
  }
  if(user){
    console.log(user);
  }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={formSubmit}>
                <input onChange={(e)=>setemail(e.target.value)} type="email" placeholder='Email' />
                <span>or</span>
                <input onChange={(e)=>setmobile(e.target.value)} type='tel' placeholder='mobile number' maxLength='10' minLength='10' />
                <input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder='Password' />
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
        
    </main>
  )
}

export default Login