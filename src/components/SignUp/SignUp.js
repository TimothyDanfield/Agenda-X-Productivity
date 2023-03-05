import React from 'react';
import './signup.css'

const SignUp = () => {
  return (
    <div className="signup-container">
      
      <form className="main">
        <label className="label"  >Sign Up</label>
        <input className="input" placeholder='Name' type="text" name="name" />

        <label className="label" ></label>
        <input className="input" placeholder='Email' type="email" name="email" />

        <label className="label" ></label>
        <input className="input" placeholder='Password'  type="password" name="password" />

        <button className="button" type="submit"  >Sign Up</button>
      </form>

    </div>  );
};
export default SignUp;