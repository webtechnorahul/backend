import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const {user,loading,register}=useAuth()
    const navigation=useNavigate();
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [mobile, setmobile] = useState('')
    const [password, setpassword] = useState('')

    async function formSubmit(e){
        e.preventDefault();
        await register(username,email,mobile,password);
        navigation('/');
    }  
    if(loading){
        return(<main><h1>Loading.....</h1></main>)
    } 

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={formSubmit}>
                <input onChange={(e)=>setusername(e.target.value)} type="text" placeholder='Username' />
                <input onChange={(e)=>setemail(e.target.value)} type="email" placeholder='Email' />
                <input onChange={(e)=>setmobile(e.target.value)} type='tel' placeholder='mobile number' maxLength='10' minLength='10' />
                <input onChange={(e)=>setpassword(e.target.value)} type="password" placeholder='Password' />
                <button type='submit'>Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    </main>
  )
}

export default Register