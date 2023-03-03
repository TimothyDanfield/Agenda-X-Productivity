import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>First Name</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      /><br/><br/>

      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      /><br/><br/>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <label>Message</label>
      <textarea rows="10" cols="50" value={message} onChange={(e) => setMessage(e.target.value)} />

      <button type="submit">Send Email</button>
    </form>
  );
};
export default ContactUs;
