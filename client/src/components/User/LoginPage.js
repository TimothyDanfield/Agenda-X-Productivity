import React, { useState, } from "react";
import { Link } from "react-router-dom"
import { Button, Input } from "antd";
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../utils/axiosConfig'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import './loginpage.css'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [providedEmail, setProvidedEmail] = useState('')
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Login Functionality:

  const loginUser = async () => {
    if (!email || !password) return;

    try {
      const newUser = await axios.post(`/api/login?email=${email}&&password=${password}`)
      setUser(newUser)
      toast.success('User logged in')
      localStorage.setItem('Id', JSON.stringify(newUser.data.user._id))
      localStorage.setItem('Token', JSON.stringify(newUser.data.token))
      navigate('/task')
    } catch (error) {
      toast.error("Incorrect username or password")
    }



  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const provideEmail = (e) => {
    setProvidedEmail(e.target.value)
  }

  const handleForgotPassword = () => {
    localStorage.setItem('ForgotPassword', JSON.stringify(providedEmail))
    navigate('/forgotpassword')
  }



  // Create funtionality for the sign up here

  return (
    <div className="login-container">
      <div className="mainlogin">
        <form className='loginForm'>
          <label className="label">Login</label>
          <Input className="input" placeholder="Email" style={{ width: "200px" }} onChange={handleEmailChange} />
          <Input className="input" placeholder="Password" style={{ width: "200px" }} onChange={handlePasswordChange} />
          <Button className="button" type="primary" onClick={loginUser}>
            Login
          </Button>
        </form>
        <div style={{width: '50%', margin: '0 auto'}}>
          <div className="links">
            <Popup
              trigger={<h5 className='forgotPwd'>Forgot Password?</h5>}
              position="bottom center"
              className='forgotPassword'>
              <form onSubmit={handleForgotPassword} className="passwordForm">
                <input placeholder="Please provide an email" onChange={provideEmail}></input>
                <button>Submit</button>
              </form>
            </Popup>
            <Link className="link" to="/signup"><h5 className="register">Register</h5></Link>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
