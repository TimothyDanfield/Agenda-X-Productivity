import React from 'react'
import {Routes, Route} from 'react-router-dom'
import "./App.css"
import NavBar from './components/NavBar/NavBar'
import Task from './components/Task/Task'
import LoginPage from './components/User/LoginPage'
import WelcomePage from './components/Home/WelcomePage'
import AboutUs from './components/AboutUs/AboutUs'
import ContactUs from './components/ContactUs/ContactUs'
import SelfCare from './components/SelfCare/SelfCare'
import SignUp from './components/SignUp/SignUp'
const App = () => {

 
  return(
    <div>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<WelcomePage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/task" element={<Task />} />
      <Route exact path="/aboutus" element={<AboutUs />} />
      <Route exact path="/contact" element={<ContactUs />} />
      <Route exact path="/selfcare" element={<SelfCare />} />
    </Routes>
    </div>
  )
}

export default App
