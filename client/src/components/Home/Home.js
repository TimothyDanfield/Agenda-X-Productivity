import React from "react";
//import { useState } from "react";
import { Link } from "react-router-dom";
import './home.css';





const WelcomePage = () => {
 /* const userJson = localStorage.get('User');
  const user = JSON.parse(userJson);
  //[user, setUser] = useState(user);*/

  return (
    <div className="welcome">
    <div className="mainwelcome">
    <h1 className="h1welcome">Welcome to The Live Wires</h1>
    <h2 className="h2welcome">One stop for all needs rolled into one. Sign up or Login!</h2>
    </div>
    
    </div>
  );
  
};

export default WelcomePage;


