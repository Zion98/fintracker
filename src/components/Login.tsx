import React from 'react'
import '../styles/login.css'

const Login = () => {
   
    return (
        <div className="Apps">
        <div className="intro">
          <div className="layer">
            <img src="/assets/img/logo.png" alt="site-logo" />
          <p>Decagon is a software engineering institute ushering in a new phase of tech-powered growth and prosperity in Nigeria by training and deploying an army of leader-developers.</p>
          </div>
      
        </div>
        <div className="login-panel">
          <h1>Login with</h1>
          <img src="/assets/img/ms-login.png" alt="ms-logo" width="150px"/>
          <hr />
          <a href="http://localhost:3000/login" >Login</a>
        </div>
      </div>
    )
}

export default Login
