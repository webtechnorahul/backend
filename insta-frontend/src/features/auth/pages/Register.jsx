import React from 'react'
import { Link } from 'react-router'
const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input type='text' placeholder='enter username' name='username' id='username' required/>
          <input type="text" placeholder='enter email' name='email' id='email' required/>
          <input type='tel' placeholder='eg:- 8767567754' minLength='10' maxLength='10' name='mobile' required />
          <input type="text" placeholder='enter password' name='password' id='pasword' required/>
          <button>Register</button>
        </form>
        <p>Already have an account? <Link to='/login'>login</Link></p>
      </div>
    </main>
  )
}

export default Register