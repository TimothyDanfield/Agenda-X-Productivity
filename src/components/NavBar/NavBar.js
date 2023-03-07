import React from "react";
import { Link } from "react-router-dom";

const handleLogOut = () => {
  localStorage.removeItem('User')
  alert("User Signed Out!")
  navigate('/login')
}

const NavBar = () => {
  return (
    <div style={{padding:"20px",   textDecoration:"none", textAlign: "center", backgroundColor: "black" }}>
      <Link style={{ textDecoration:"none", color: "white", padding: "10px" }} to="/signup">
        SignUp
      </Link>
      <Link style={{ textDecoration:"none", color: "white", padding: "10px" }} to="/login">
        Login
      </Link>

      <Link style={{ textDecoration:"none", color: "white", padding: "10px" }} to="/task">
        Work
      </Link>

      <Link style={{ textDecoration:"none", color: "white", padding: "10px" }} to="/selfcare">
        SelfCare
      </Link>
      <Link style={{ textDecoration:"none", color: "white", padding: "10px" }} to="/aboutus">
        About Us
      </Link>
      <Link style={{ textDecoration:"none", color: "white", padding: "10px" }} to="/contact">
        Contact Us
      </Link>
    </div>
  );
};

export default NavBar;
