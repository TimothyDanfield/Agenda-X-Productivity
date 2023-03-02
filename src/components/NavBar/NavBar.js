import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/task">Work</Link>

      <Link to="/self-care">Self-Care</Link>
      <Link to="/aboutus">About Us</Link>
      <Link to="/contact">Contact Us</Link>
    </div>
  );
};

export default NavBar;
