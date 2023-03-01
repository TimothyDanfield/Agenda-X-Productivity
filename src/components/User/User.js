import React, { useState } from "react";
import { Button, Input } from "antd";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Login Functionality:

  const loginUser = () => {
    if (!username || !password) return;

    let userObj = { username: username, password: password };

    console.log("User Logged In", userObj);

    alert("User Logged In!");

    resetForm();
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Input placeholder="Username" onChange={handleUsernameChange} />
      <Input placeholder="Password" onChange={handlePasswordChange} />
      <Button type="primary" onClick={loginUser}>
        Login
      </Button>
    </div>
  );
};

export default User;
