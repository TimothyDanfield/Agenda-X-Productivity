import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css"
import NavBar from './components/NavBar/NavBar'
import Task from './components/Task/Task'
import LoginPage from './components/User/LoginPage'
import WelcomePage from './components/Home/WelcomePage'
import AboutUs from './components/AboutUs/AboutUs'
import ContactUs from './components/ContactUs/ContactUs'
import SelfCare from './components/SelfCare/SelfCare'
import SignUp from './components/SignUp/SignUp'
import ProfilePage from './components/Profile/ProfilePage'
import PrivateRoutes from './utils/PrivateRoutes'
const App = () => {

  const user = localStorage.getItem('user')


  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/task" element={<Task />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route exact path="/selfcare" element={<SelfCare />} />
          <Route exact path='/profile' element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
