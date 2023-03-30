import React from "react";
import emailjs from 'emailjs-com'
import { ToastContainer, toast } from 'react-toastify'
import { EMAIL_KEY } from "../../configs/constants";
import 'react-toastify/dist/ReactToastify.css'
import './contactus.css'
const ContactUs = () => {

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('service_s0a4xlw', 'template_0reyskf', e.target, EMAIL_KEY)
      .then((result) => {
        console.log(result.text)
        toast('Email sent', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      })
      .catch((error) => {
        console.log(error.text)
      })
    e.target.reset()
  }

  return (
    <div className='contactBody'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="contact-container">
        <div className="headerContainer">
          <h1 className="title">Contact <span className='contact-header-name'>Us</span></h1>
          <div>
            <p className="titleParagraph">
              We value your feedback and are committed to providing exceptional customer service.
              Please use the form below to submit your inquiry, and our team will respond promptly.
              We look forward to hearing from you.
            </p>
          </div>
        </div>
        <form className="form" onSubmit={sendEmail}>
          <div className="form-group">
            <input type="text" className='contactText contact-input' id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <input type="email" className='contactEmail contact-input' id="email" name="email" placeholder="Your email" required />
          </div>
          <div className="form-group">
            <textarea id="message" name="message" className='contact-input contact-message' placeholder="Your message" required />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="submit-btn" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ContactUs;
