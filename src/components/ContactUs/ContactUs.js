import React, { useState } from "react";
import { Button, Input } from "antd";
import './contactus.css'
const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email here

    alert("Email sent!");

    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    
    <div className="contactus-container">
    <h1>Thank you for your interest in having us build you a website with productivity in mind. We understand the importance of creating a website that is both efficient and effective. Our team of experienced web developers will work with you to create a website that meets your needs and exceeds your expectations. We will provide you with a comprehensive plan that outlines the scope of the project, timeline, budget, and any other requirements. We look forward to working with you to create a website that is tailored to your specific needs and goals. Please contact us if you have any questions or would like to discuss further details.</h1>
    <form className="main" onSubmit={handleSubmit}>
      <label className="label">Contact Us</label>
      <Input placeholder="First Name" className="input"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      
      <Input placeholder="Last Name" className="input"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      
      <Input placeholder="Email" className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      
      <Input placeholder="Message" className="input" rows="10" cols="50" value={message} onChange={(e) => setMessage(e.target.value)} />

      <Button  className="button" type="submit">Send Email</Button>
    </form>
    </div>
  );
};
export default ContactUs;
