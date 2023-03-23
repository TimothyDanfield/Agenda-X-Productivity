import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../utils/axiosConfig'
import Popup from 'reactjs-popup';
import GoogleLogin from '../GoogleLogin/GoogleLogin'
import 'reactjs-popup/dist/index.css'
import './loginpage.css'

const LoginPage = () => {
  const [name, setName] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState()

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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

  const handleForgotPassword = () => {
    localStorage.setItem('ForgotPassword', JSON.stringify(email))
    navigate('/forgotpassword')
  }


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSecurityQuestion = (e) => {
    setSecurityQuestion(e.target.value)
  }

  const handleSecurityAnswer = (e) => {
    setSecurityAnswer(e.target.value)
  }

  // Signup Functionality:

  const signUp = async (e) => {
    e.preventDefault()
    try {
      if (!password || !name || !email || !securityQuestion || !securityAnswer) {
        toast.error("Please fill out required information");
      } else {
        const newUser = await axios.post(`/api/register`, {
          name: name,
          email: email,
          password: password,
          securityQuestion: securityQuestion,
          securityAnswer: securityAnswer
        })
        localStorage.setItem('User', JSON.stringify(newUser.data.user))
        localStorage.setItem('Token', JSON.stringify(newUser.data.token))
        navigate('/profile')
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create funtionality for the sign up here

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input type="email" className="form-style" placeholder="Email" onChange={handleEmailChange} />
                        </div>
                        <div className="form-group mt-2">
                          <input type="password" className="form-style" placeholder="Password" onChange={handlePasswordChange} />
                        </div>
                        <button onClick={loginUser} className="btn mt-4">Login</button>
                        <div className="mb-0 mt-4 text-center or">Or</div>
                        <div className="mb-0 mt-4 text-center google">
                          <GoogleLogin />
                        </div>
                        <p className="mb-0 mt-4 text-center">
                          <Popup
                            trigger={<span className='forgotPwd link'>Forgot Password?</span>}
                            position="bottom center"
                            className='forgotPassword'>
                            <div className="form-group mt-2">
                              <input onChange={handleEmailChange} type="email" className="form-style" placeholder="Email" />
                              <i className="input-icon uil uil-at"></i>
                              <button onClick={handleForgotPassword} className="forgotPwdButton">Submit</button>
                            </div>
                          </Popup>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-3 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input onChange={handleNameChange} type="text" className="form-style" placeholder="Name" />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input onChange={handleEmailChange} type="email" className="form-style" placeholder="Email" />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <select onChange={handleSecurityQuestion} type="select" className="form-style" style={{ marginBottom: 10 }} placeholder="Security Question">
                            <option value="N/A">Security Question</option>
                            <option value="What is your oldest sibling's middle name?">What is your oldest sibling's middle name?</option>
                            <option value="Where did you meet your spouse?">Where did you meet your spouse?</option>
                            <option value="What was your first car?">What was your first car?</option>
                            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                          </select>
                          <i className="input-icon uil uil-lock-access"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input onChange={handleSecurityAnswer} type='text' className="form-style" placeholder="Security Question Answer" />
                          <i className="input-icon uil uil-comment-alt-question"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input onChange={handlePasswordChange} type="password" className="form-style" placeholder="Password" />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button onClick={signUp} className="btn mt-4">Register</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
