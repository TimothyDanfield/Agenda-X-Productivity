import React from 'react';
import './aboutus.css';
//import person1Picture from './images/person1.jpg';
//import person2Picture from './images/person2.jpg';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>Welcome to our Todo List App!</h1>
      <p>We are a dynamic duo of developers who believe that a well-organized to-do list can make a huge difference in people's lives. Our app is designed to help you keep track of your tasks, prioritize them, and achieve your goals with ease.</p>
      
      <h2>Meet the team behind the app:</h2>
      <div className="team-section">
        <div className="person">
          <img src='{person1Picture}' alt="Person 1"/>
          <h3>Nathaniel Grandinette</h3>
          <p>Nathaniel is a full-stack developer with a passion for creating elegant and efficient solutions to complex problems. He has experience working with a HTML, CSS, JavaScript, and React, and is always eager to learn new things.</p>
        </div>
        <div className="person">
          <img src='{person2Picture}' alt="Person 2"/>
          <h3>Timothy Danfield</h3>
          <p>Timothy is a full-stack developer with a keen eye for design and user experience. He loves working with HTML, CSS, and JavaScript to create beautiful and intuitive interfaces that users love. He is also an avid learner and constantly seeks to improve his skills.</p>
        </div>
      </div>
      
      <p>We hope that our app will help you stay on top of your tasks and achieve your goals. Thank you for choosing our Todo List App!</p>
    </div>
  );
}

export default AboutUs;