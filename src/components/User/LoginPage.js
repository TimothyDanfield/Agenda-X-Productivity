import React, { useState, } from "react";
import { Link } from "react-router-dom"
import { Button, Input } from "antd";
import { useNavigate } from 'react-router-dom'
import axios from '../../utils/axiosConfig'
import './loginpage.css'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    let userObj = { email: email, password: password };

    try {
      const newUser = await axios.post(`/api/login?email=${email}&&password=${password}`)
      if (newUser) {
        setUser(newUser)
        alert("User Logged In!");
        localStorage.setItem('User', JSON.stringify(newUser.data))
        navigate('/task')
        resetForm();
      } else {
        alert("Incorrect username or password")
      }
    } catch (error) {
      console.log(error)
    }



  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };




  // Create funtionality for the sign up here

  return (
    <div className="login-container">
      <div className="main">
        <form>
          <label className="label">Login</label>
          <Input className="input" placeholder="Email" style={{ width: "200px" }} onChange={handleEmailChange} />
          <Input className="input" placeholder="Password" style={{ width: "200px" }} onChange={handlePasswordChange} />
          <Button className="button" type="primary" onClick={loginUser}>
            Login
          </Button>
        </form>
        <Link className="link" to="/signUp">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
