import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  return (
    <div className="home-page-container">
      <div className="hero-section">
        {showTitle && <h1 className="title">Todo List</h1>}
        {showSubtitle && <p className="subtitle">Organize your tasks and achieve your goals with ease</p>}
        {showButton && <button className="get-started-button" onClick={() => navigate('/login')}>Get Started</button>}
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

      <div className="cta-section">
        <h2>Ready to get started?</h2>
        <button className="cta-button" onClick={() => navigate('/signup')}>Create an Account</button>
        <p style={{color: 'black'}}>Already have an account? <Link to="/login" style={{textDecoration: 'none'}}>Sign in</Link></p>
      </div>
    </div>
  );
}

export default Home;


