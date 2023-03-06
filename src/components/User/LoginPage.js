import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from '../../utils/axiosConfig'
import './loginpage.css'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const newUser = await axios.get(`/api/user?email=${email}`)
      if (newUser.data.email === email && newUser.data.password === password) {
        console.log("User Logged In", userObj);

        alert("User Logged In!");

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
    <form className="main">
    <h1>Login</h1>
      <Input className="input" placeholder="Email" style={{ width: "200px" }} onChange={handleEmailChange} />
      <Input className="input" placeholder="Password" style={{ width: "200px" }} onChange={handlePasswordChange} />
      <Button className="button" type="primary" onClick={loginUser}>
        Login
      </Button>
      </form>
    </div>
  );
};

export default LoginPage;
