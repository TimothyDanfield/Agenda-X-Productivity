import React from 'react';
import './signup.css'

const SignUp = () => {
  return (
    <div className="signup-container">
      <h1 className="signup" >Sign Up</h1>
      <form className="main">
        <label className="label" >Name:</label>
        <input className="input" type="text" name="name" />

        <label className="label" >Email:</label>
        <input className="input"  type="email" name="email" />

        <label className="label" >Password:</label>
        <input className="input"  type="password" name="password" />

        <button className="button" type="submit"  >Sign Up</button>
      </form>

    </div>  );
};
export default SignUp;