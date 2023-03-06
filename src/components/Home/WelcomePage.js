import React from 'react'
import { useState } from 'react';
//import {Link} from 'react-router-dom'


const WelcomePage = () => {
  const [username] = useState("");

  return (
    <div>Hello {username}! How can we help you be more productive today? </div>
    
  )
}

export default WelcomePage
   
 //I added this page into the NavBar as well. Other than that I've done nothing. -Vesper
//        use the Link option for the links please :) -Nate