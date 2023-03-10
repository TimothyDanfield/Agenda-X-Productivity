import React from "react";
import { Link, } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import './navbar.css'



const NavBar = () => {

  const navigate = useNavigate()
  let user = localStorage.getItem('Id')
  user = true
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="navbar">
      {user ?
        <div style={{ padding: "20px", textDecoration: "none", textAlign: "center", backgroundColor: "black" }}>
          
          <Link  to="/home">
            Home
          </Link>
          <Link to="/login">
            Login
          </Link>
          <Link to="/musicplayer">
            Music
          </Link>

          <Link to="/task">
            Work
          </Link>

          
          <Link to="/aboutus">
            About Us
          </Link>
          <Link  to="/contact">
            Contact Us
          </Link>
          <Link to="/profile">
            Profile
          </Link>
          {/* <video  autoPlay loop   src="people.mp4"></video> */}

          <button onClick={handleLogout}>Logout</button>
        </div> :
        <div className="navbar">
         
          <Link  to="/login">
            Login
          </Link>

          <Link  to="/aboutus">
            About Us
          </Link>
          <Link  to="/contact">
            Contact Us
          </Link>
        </div>}
    </div>
  );
};

export default NavBar;
