import React, { useState } from "react";
import { Link, } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { googleLogout } from "@react-oauth/google";
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import { Spin as Hamburger } from 'hamburger-react'
import './navbar.css'



const NavBar = () => {

  const [toggle, setToggle] = useState(false)


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
        <div>
          <div className="navbar2">
            <span style={{ color: 'white' }}>{`Welcome, ${user.name}`}</span>
            <MusicPlayer />
            <div>
              <Hamburger color='white' onToggle={setToggle} />
            </div>
          </div>
          <div>

            {toggle ?
              <div className='links'>
                <Link to="/task" className='link'>
                  Work
                </Link>
                <Link to="/notes" className='link'>
                  Notes
                </Link>
                <Link to="/aboutus" className='link'>
                  About Us
                </Link>
                <Link to="/contact" className='link'>
                  Contact Us
                </Link>
                <Link to="/profile" className='link'>
                  Profile
                </Link>

                <button onClick={handleLogout} className='logout-button'>Logout</button>
              </div> : ''}
          </div>
        </div> :
        <div className="navbar3">
          <span style={{ color: 'white' }}>{`Welcome`}</span>
          <div className='links'>
            <Link to="/home" className='link'>
              Home
            </Link>
            <Link to="/aboutus" className='link'>
              About Us
            </Link>
            <Link to="/contact" className='link'>
              Contact Us
            </Link>
          </div>
          <div></div>
        </div>
      }
    </div>
  );
};

export default NavBar;
