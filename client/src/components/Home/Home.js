import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginPage from '../User/LoginPage';
import 'reactjs-popup/dist/index.css'
import './home.css';

function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500);
    setTimeout(() => setShowSubtitle(true), 1000);
    setTimeout(() => setShowButton(true), 1500);
    setTimeout(() => setShowFeatures(true), 2000);
  }, []);

  const scrollToBottom = () =>{ 
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 

  return (
    <div className="home-page-container">
      <div className="hero-section">
        {showTitle && <h1 className="homeTitle">Todo List</h1>}
        {showSubtitle && <p className="subtitle">Organize your tasks and achieve your goals with ease</p>}
        {showButton && <button className="get-started-button" onClick={scrollToBottom}>Get Started</button>}
      </div>

      <div className="features-section">
        <div className="feature">
          <i className="fas fa-check-circle"></i>
          <h3>Easy Task Management</h3>
          <p>Keep track of all your tasks in one place and easily manage them</p>
        </div>
        <div className="feature">
          <i className="fas fa-calendar-alt"></i>
          <h3>Calendar Integration</h3>
          <p>Sync your tasks with your calendar and never miss a deadline again</p>
        </div>
        <div className="feature">
          <i className="fas fa-clipboard-check"></i>
          <h3>Note Creation</h3>
          <p>Create notes to keep track of whats important</p>
        </div>
      </div>

      <div className="login-form-container">
        <LoginPage />
      </div>
    </div>
  );
}

export default Home;


