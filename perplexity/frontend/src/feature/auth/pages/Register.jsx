import React, { useState } from 'react'
import '../styles/form.css'
import { Link } from 'react-router-dom'
const Register = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [mobile, setmobile] = useState(null)
  const [password, setpassword] = useState('')
  return (
    <main >
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input onChange={(e)=>{
            setusername(e.target.value)
          }} value={username} type="text" placeholder="enter username" name="username" id="username"/>
          <input onChange={(e)=>{
            setemail(e.target.value)
          }} value={email} type="text" placeholder="enter email" name="email" id="email"/>
          <input onChange={(e)=>{
            setmobile(e.target.value)
          }} value={mobile} type="text" placeholder="enter mobile" name="mobile" id="mobile"/>
          <input onChange={(e)=>{
            setpassword(e.target.value)
          }} value={password} type="text" placeholder="enter password" name="password" id="password"/>
          <button>Register</button>
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </main>
  )
}

export default Register