import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Task from "./components/Task/Task";
import LoginPage from "./components/User/LoginPage";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import SignUp from "./components/SignUp/SignUp";
import ProfilePage from "./components/Profile/ProfilePage";
import PrivateRoutes from "./utils/PrivateRoutes";
import Notes from "./components/Notes/Notes";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
const App = () => {
  const user = localStorage.getItem("user");

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />

        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="forgotpassword" element={<ForgotPassword />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/task" element={<Task />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route exact path="/musicplayer" element={<MusicPlayer />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/notes" element={<Notes />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
