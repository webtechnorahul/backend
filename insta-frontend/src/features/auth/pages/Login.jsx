import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router'
import { useAuth } from '../hooks/UseAuth'
import { userLogin } from '../services/auth.api'
import '../styles/form.scss'


const Login = () => {
  const navigate=useNavigate()
  const {user,loading,handleLogin}=useAuth()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  async function formHandle(e){
    e.preventDefault();
    await handleLogin(email,password)
    navigate('/login')
  }
  if(loading){
    return(<main><h1>Loading.....</h1></main>)
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={(e)=>{formHandle(e)}}>
          <input onChange={(e)=>{setemail(e.target.value)}} type="text" placeholder='enter email' name='email' id='email' required/>
          <input onChange={(e)=>{setpassword(e.target.value)}} type="text" placeholder='enter password' name='password' id='pasword' required/>
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Login