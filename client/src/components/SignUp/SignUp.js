import React, { useState } from "react";
import "./signup.css";

import { Button, Input } from "antd";
import axios from "../../utils/axiosConfig";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSecurityQuestion = (e) => {
    setSecurityQuestion(e.target.value)
  }
  console.log(securityQuestion)
  const handleSecurityAnswer = (e) => {
    setSecurityAnswer(e.target.value)
  }

  // Signup Functionality:

  const signUp = async (e) => {
    e.preventDefault()
    try {
      if (!password || !name || !email || !securityQuestion || !securityAnswer) {
        alert("Please fill out required information");
      } else {
        const newUser = await axios.post(`/api/register`, {
          name: name,
          email: email,
          password: password,
          securityQuestion: securityQuestion,
          securityAnswer: securityAnswer
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

        <input
          className="input"
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleEmailChange}
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
        />

        <select className="input security" onChange={handleSecurityQuestion}>
          <option value="N/A">Security Question</option>
          <option value="What is your oldest sibling's middle name?">What is your oldest sibling's middle name?</option>
          <option value="Where did you meet your spouse?">Where did you meet your spouse?</option>
          <option value="What was your first car?">What was your first car?</option>
          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
        </select>

        <input
          className="input"
          placeholder="Security Answer"
          type="text"
          name="security"
          onChange={handleSecurityAnswer}
        />

        <button className="button" type="submit" onClick={signUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
