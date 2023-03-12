import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './WelcomePage.css';
import { Button, Input } from "antd";



const WelcomePage = () => {
  const user = JSON.parse(localStorage.getItem('User'))
  const [username, setUsername] = useState('Vesper');


  return (
    <div className="welcomePage">
      <h2 className="welcomeNote">
        Hello {username}! How can we help you be more productive today?
      </h2>

      <Link to="/task">
        <Button className = 'workButton'>Work</Button>
      </Link>

      <Link to="not made yet">
        <button>Vacation</button>
      </Link>

      <Link to="/selfcare">
        <button>SelfCare</button>
      </Link>

      <Link to="not made yet">
        <button>Social</button>
      </Link>
    </div>
  );
};

export default WelcomePage;


