import React from "react";
import { Link, } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { googleLogout } from "@react-oauth/google";
import Notes from '../Notes/Notes'
import './navbar.css'



const NavBar = () => {


  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('User'))
  const handleLogout = () => {
    googleLogout();
    localStorage.clear()
    navigate('/')
  }
  console.log(user)
  return (
    <div className="navbar">
      {user ?
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <span style={{ color: 'white' }}>{`Welcome, ${user.name}`}</span>
          <div>
            <Link to="/musicplayer">
              Music
            </Link>
            <Link to="/task">
              Work
            </Link>
            <Link to="/notes">
              Notes
            </Link>
            <Link to="/aboutus">
              About Us
            </Link>
            <Link to="/contact">
              Contact Us
            </Link>
            <Link to="/profile">
              Profile
            </Link>
          </div>
          <div>
            <button onClick={handleLogout} className='logout-button'>Logout</button>
          </div>
        </div> :
        <div>
          <Link to="/home">
            Home
          </Link>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Sign Up
          </Link>
          <Link to="/aboutus">
            About Us
          </Link>
          <Link to="/contact">
            Contact Us
          </Link>
        </div>}
    </div>
  );
};

export default NavBar;
