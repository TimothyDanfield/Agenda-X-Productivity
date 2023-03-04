import React from 'react';

const SignUp = () => {
  return (
    <div className="signup-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Sign Up</h1>
      <form>
        <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Name:</label>
        <input type="text" name="name" />

        <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Email:</label>
        <input type="email" name="email" />

        <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Password:</label>
        <input type="password" name="password" />

        <button type="submit" style={{ backgroundColor:'#0099FF', color:'#FFFFFF', padding:'10px 20px', borderRadius:'5px'}} >Sign Up</button>
      </form>

    </div>  );
};
export default SignUp;