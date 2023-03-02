import React from 'react'
import "./App.css"
import Task from "./components/Task/Task"
import LoginPage from "./components/User/LoginPage"
import WelcomePage from "./components/Home/WelcomePage"
const App = () => {

 
  return(
    <div>
    
    <Task />
    <LoginPage />
    </div>
  )
}

export default App
