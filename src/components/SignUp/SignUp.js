import React, { useState } from "react";
import "./signup.css";

import { Button, Input } from "antd";
import axios from "../../utils/axiosConfig";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Signup Functionality:

  const signUp = async (e) => {
    e.preventDefault()
    try {
      if (!password || !name || !email) {
        alert("Please fill out required information");
      } else {
        const newUser = await axios.post(`/api/register`, {
          name: name,
          email: email,
          password: password,
        });
        alert("SignUp Success");

        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <form className="main">
        <label className="label">Sign Up</label>
        <input
          className="input"
          placeholder="Name"
          type="text"
          name="name"
          onChange={handleNameChange}
        />

        <label className="label"></label>
        <input
          className="input"
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleEmailChange}
        />

        <label className="label"></label>
        <input
          className="input"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
        />

        <button className="button" type="submit" onClick={signUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
