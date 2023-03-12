import React from "react";
import { Link, } from "react-router-dom";
import { useNavigate } from 'react-router-dom'



const NavBar = () => {

  const navigate = useNavigate()
  let user = localStorage.getItem('Id')
  user = true
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div>
      {user ?
        <div style={{ padding: "20px", textDecoration: "none", textAlign: "center", backgroundColor: "black" }}>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/signup">
            SignUp
          </Link>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/login">
            Login
          </Link>

          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/task">
            Work
          </Link>

          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/selfcare">
            SelfCare
          </Link>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/aboutus">
            About Us
          </Link>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/contact">
            Contact Us
          </Link>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/profile">
            Profile
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </div> :
        <div style={{ padding: "20px", textDecoration: "none", textAlign: "center", backgroundColor: "black" }}>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/signup">
            SignUp
          </Link>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/login">
            Login
          </Link>

          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/aboutus">
            About Us
          </Link>
          <Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/contact">
            Contact Us
          </Link>
        </div>}
    </div>
  );
};

export default NavBar;
