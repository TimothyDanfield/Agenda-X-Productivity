import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axiosConfig'
import { toast, Toaster } from 'react-hot-toast'
import Popup from 'reactjs-popup';
import GoogleLogin from '../GoogleLogin/GoogleLogin'
import 'reactjs-popup/dist/index.css'
import './home.css';

function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [providedEmail, setProvidedEmail] = useState('')
  const [user, setUser] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500);
    setTimeout(() => setShowSubtitle(true), 1000);
    setTimeout(() => setShowButton(true), 1500);
    setTimeout(() => setShowFeatures(true), 2000);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Google Login Functionality:

  
// Normal login functionality
  const loginUser = async (e) => {
    e.preventDefault()
    if (!email || !password) return;

    try {
      const newUser = await axios.post(`/api/login?email=${email}&&password=${password}`)
      setUser(newUser)
      localStorage.setItem('User', JSON.stringify(newUser.data.user))
      localStorage.setItem('Token', JSON.stringify(newUser.data.token))
      navigate('/profile')
    } catch (error) {
      toast.error("Incorrect username or password")
    }
  };

  const provideEmail = (e) => {
    setProvidedEmail(e.target.value)
  }

  const handleForgotPassword = () => {
    localStorage.setItem('ForgotPassword', JSON.stringify(providedEmail))
    navigate('/forgotpassword')
  }

  return (
    <div className="home-page-container">
      <div className="hero-section">
        {showTitle && <h1 className="homeTitle">Todo List</h1>}
        {showSubtitle && <p className="subtitle">Organize your tasks and achieve your goals with ease</p>}
        {showButton && <button className="get-started-button" onClick={() => navigate('/signup')}>Get Started</button>}
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
        <h2>Login</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          
          <button id="myButton" onClick={loginUser}>
            Login
          </button>
          
        </form>
        <div style={{margin: '20px' }}>Or</div>
        <GoogleLogin />
        <p style={{color: 'black'}}>Don't have an account yet? <Link to="/signup" style={{textDecoration: 'none'}}>Sign up</Link></p>
        <Popup
              trigger={<h5 className='forgotPwd'>Forgot Password?</h5>}
              position="bottom center"
              className='forgotPassword'>
              <form onSubmit={handleForgotPassword} className="passwordForm">
                <input placeholder="Please provide an email" onChange={provideEmail}></input>
                <button>Submit</button>
              </form>
            </Popup>
      </div>
    </div>
  );
}

export default Home;


