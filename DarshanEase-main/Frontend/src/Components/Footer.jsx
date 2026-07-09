import React from 'react';
import './footer.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id='contact' className='footer-container'>
      <div className='footer-content'>
        <div className='footer-brand'>
          <h2>
            <img src={logo} alt="DarshanEase Logo" className="footer-logo" />
            DarshanEase
          </h2>
          <p>"Embark on a Spiritual Journey, One Darshan at a Time – Seamless Temple Darshan Ticket Booking at Your Fingertips!"</p>
        </div>

        <div className='footer-links'>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#temples">Temples</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><Link to="/ulogin">Login / Register</Link></li>
          </ul>
        </div>

        <div className='footer-contact'>
          <h3>Contact Us</h3>
          <p>📧 Email: tharunreddy7984@gmail.com</p>
          
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter email for updates" 
              className="newsletter-input"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>Copyright &copy; {new Date().getFullYear()} By Salapala Tharun Reddy. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;