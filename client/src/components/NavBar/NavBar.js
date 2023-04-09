import React from "react";
import { Link, } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { googleLogout } from "@react-oauth/google";
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import './navbar.css'



const NavBar = () => {


  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('User'))
  const handleLogout = () => {
    googleLogout();
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="navbar1">
      {user ?
        <div className="navbar2">
          <span style={{ color: 'white' }}>{`Welcome, ${user.name}`}</span>
          <MusicPlayer />
          <div>
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
          <div style={{maxHeight: '5px'}}>
            <button onClick={handleLogout} className='logout-button'>Logout</button>
          </div>
        </div> :
        <div className="navbar2">
          <span style={{ color: 'white' }}>{`Welcome`}</span>
          <div>
          <Link to="/home">
            Home
          </Link>
          <Link to="/aboutus">
            About Us
          </Link>
          <Link to="/contact">
            Contact Us
          </Link>
          </div>
          <div></div>
        </div>}
    </div>
  );
};

export default NavBar;
