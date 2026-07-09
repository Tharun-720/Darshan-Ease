import React from 'react';
import './loadingScreen.css';
import logo from '../assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="logo-spinner">
          <img src={logo} alt="DarshanEase Loading..." />
        </div>
        <h2 className="loading-text">Awakening Spirituality...</h2>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
