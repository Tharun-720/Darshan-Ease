import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';
import './auth.css';

const Ulogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { email, password };
    axios
      .post("http://localhost:7000/user/ulogin", payload, { timeout: 1000 })
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/uhome');
        } else {
          alert("wrong credentials");
        }
      })
      .catch((err) => {
        console.warn("MongoDB is offline. Checking LocalStorage Prototype DB:", err);
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
           localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
           // Redirect safely to home where Unavbar correctly checks auth
           navigate('/');
           // Force a reload so Navbar checks localStorage immediately
           window.location.reload(); 
        } else {
           alert("Invalid Email or Password");
        }
      });
  };

  const formHandle1 = (e) => {
    e.preventDefault();
    navigate("/usignup");
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home-link">
        <FaArrowLeft /> Back to Home
      </Link>
      
      <div className="auth-image-side">
        <img 
          src="https://d2al04l58v9bun.cloudfront.net/blog/wp-content/uploads/2022/07/20122054/Indian-Temple-Architecture-With-The-Most-Amazing-Stories.jpg" 
          alt="Ancient Indian Temple" 
        />
        <div className="auth-image-overlay">
          <h1 style={{ fontFamily: 'Cinzel, serif', color: '#ff8c00' }}>DarshanEase</h1>
          <p>Begin your divine journey. Book your Darshan tickets with peace and devotion.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Login to your user account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Log In
            </button>

            <div className="auth-footer">
              Don't have an account? 
              <button onClick={formHandle1} type="button">
                Create one
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ulogin;
