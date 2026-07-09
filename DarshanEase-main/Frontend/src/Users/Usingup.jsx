import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './auth.css';

const Usignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { name, email, password };

    axios
      .post("http://localhost:7000/user/usignup", payload, { timeout: 1000 })
      .then((result) => {
        alert('Account created');
        navigate('/ulogin');
      })
      .catch((err) => {
        console.warn("MongoDB is offline. Using LocalStorage Prototype Database:", err);
        // FAKE DB PROTOTYPE (LocalStorage JSON)
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        
        if (mockUsers.some(u => u.email === email)) {
            alert("Already have an account (Mock DB)");
        } else {
            // Generate a random ID mimicking MongoDB ObjectID
            const mockId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
            mockUsers.push({ id: mockId, name, email, password });
            localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
            alert('Account created successfully!');
            navigate('/ulogin');
        }
      });
  };

  const formHandle1 = (e) => {
    e.preventDefault();
    navigate("/ulogin");
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home-link">
        <FaArrowLeft /> Back to Home
      </Link>
      
      <div className="auth-image-side">
        <img 
          src="https://d2al04l58v9bun.cloudfront.net/blog/wp-content/uploads/2022/07/20122054/Indian-Temple-Architecture-With-The-Most-Amazing-Stories.jpg" 
          alt="Temple Architecture" 
        />
        <div className="auth-image-overlay">
          <h1>Join DarshanEase</h1>
          <p>Begin your spiritual journey with us today.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up as a new user</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                placeholder="Enter your name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="Create a password"
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign Up
            </button>

            <div className="auth-footer">
              Already have an account? 
              <button onClick={formHandle1} type="button">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Usignup;
