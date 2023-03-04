import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from '../../utils/axiosConfig'

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Login Functionality:

  const loginUser = async () => {
    if (!username || !password) return;

    let userObj = { username: username, password: password };

    try {
      const newUser = await axios.get(`/api/user?username=${username}`)
      if (newUser.data.username === username && newUser.data.password === password) {
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
    setUsername("");
    setPassword("");
  };

  // Create funtionality for the sign up here

  return (
    <div>
      <Input placeholder="Username" style={{ width: "200px" }} onChange={handleUsernameChange} />
      <Input placeholder="Password" style={{ width: "200px" }} onChange={handlePasswordChange} />
      <Button type="primary" onClick={loginUser}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
