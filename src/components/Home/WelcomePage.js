import React from "react";
//import { useState } from "react";
import { Link } from "react-router-dom";
import './WelcomePage.css';





const WelcomePage = () => {
 /* const userJson = localStorage.get('User');
  const user = JSON.parse(userJson);
  //[user, setUser] = useState(user);*/

  return (
    <div className="welcomePage">
      <h1 className="welcomeNote">
        Hello {""}! What's on your AgendaX today? How will you be more productive today?
      </h1>

    <div className = 'workDiv'>
      <Link to="/task">
        <button className = 'workButton'>Work</button>
      </Link>
      </div>
      
      <div className = 'socialDiv'>
      <Link to="not made yet">
        <button className = "socialButton">Social</button>
      </Link>
      </div>

      <div className= 'exerciseDiv'>
      <Link to="not made yet">
        <button className = 'exerciseButton'>Exercise</button>
      </Link>
      </div>

      <div className = 'selfCareDiv'>
      <Link to="/selfcare">
        <button className = 'selfCareButton'>SelfCare</button>
      </Link>
      </div>

      <div className = 'vacationDiv'> 
      <Link to="not made yet">
        <button className = 'vacationButton'>Vacation</button>
      </Link>
      </div>

      <div className = 'personalizedDiv' > 
      <Link to="not made yet">
        <button className = 'personalizedButton'>Create Your Own Catagory</button>
      </Link>
      </div>
    
    </div>
  );
  
};

export default WelcomePage;


