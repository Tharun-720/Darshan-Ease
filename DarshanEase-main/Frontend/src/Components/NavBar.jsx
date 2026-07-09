import React, { useState } from 'react';
import './navbar.css';
import logo from '../assets/logo.png';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import MagneticButton from './MagneticButton';

const NavBar = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Consider closing dropdown when clicking outside in a future iteration
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className='navabar'>
      <Link 
        to='home' 
        smooth={true} 
        duration={500} 
        onClick={scrollToTop} 
        className='logo-container'
      >
        <img
          src={logo || 'https://i.pinimg.com/236x/47/8d/91/478d91cfdd23742558b17ee10fdd1415.jpg'}
          alt='DarshanEase Logo'
        />
        <h4>DarshanEase</h4>
      </Link>
      
      <div className='nav-links'>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn"
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <p>
          <Link to='home' smooth={true} duration={500} onClick={scrollToTop} offset={-80}>
            Home
          </Link>
        </p>
        <p>
          <Link to='temples' smooth={true} duration={500} offset={-120}>
            Temples
          </Link>
        </p>
        <p>
          <Link to='about' smooth={true} duration={500} offset={-80}>
            About
          </Link>
        </p>
        <p>
          <Link to='services' smooth={true} duration={500} offset={-80}>
            Services
          </Link>
        </p>
        <p>
          <Link to='contact' smooth={true} duration={500} offset={-80}>
            Contact
          </Link>
        </p>

        {user ? (
          <div className='login-btn-container' style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <RouterLink to='/mybookings' style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: '600' }}>
              My Bookings
            </RouterLink>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-hover)', padding: '5px 15px', borderRadius: '20px' }}>
              <span style={{ fontWeight: 'bold' }}>👤 {user.name}</span>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'var(--primary)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 12px', 
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  cursor: 'pointer' 
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className='login-btn-container'>
            <MagneticButton padding={20} magneticPull={0.3}>
              <RouterLink to='/ulogin' className='login-btn dropbtn'>
                Login / Sign Up
              </RouterLink>
            </MagneticButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;