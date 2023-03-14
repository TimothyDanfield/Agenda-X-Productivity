import React from "react";
//import { useState } from "react";
import { Link } from "react-router-dom";
import './WelcomePage.css';





const WelcomePage = () => {
 /* const userJson = localStorage.get('User');
  const user = JSON.parse(userJson);
  //[user, setUser] = useState(user);*/

  return (
    <div className="welcome">
    <h1 className="h1welcome">Welcome to The Live Wires</h1>
    <h2 className="h2welcome">One stop for all needs rolled into one. Sign up or Login!</h2>
    </div>
  );
  
};

export default WelcomePage;


