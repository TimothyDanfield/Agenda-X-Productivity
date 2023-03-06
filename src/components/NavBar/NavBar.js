import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div style={{ textAlign: "center", backgroundColor: "black" }}>
      <Link style={{ color: "white", padding: "10px" }} to="/signup">
        SignUp
      </Link>
      <Link style={{ color: "white", padding: "10px" }} to="/login">
        Login
      </Link>

      <Link style={{ color: "white", padding: "10px" }} to="/task">
        Work
      </Link>

      <Link style={{ color: "white", padding: "10px" }} to="/selfcare">
        SelfCare
      </Link>
      <Link style={{ color: "white", padding: "10px" }} to="/aboutus">
        About Us
      </Link>
      <Link style={{ color: "white", padding: "10px" }} to="/contact">
        Contact Us
      </Link>
    </div>
  );
};

export default NavBar;
