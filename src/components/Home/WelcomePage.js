import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="welcomePage">
      <h2 className="welcomeNote">
        {" "}
        Hello {""}! How can we help you be more productive today?{" "}
      </h2>

      <Link to="/task">
        <button>Work</button>
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


