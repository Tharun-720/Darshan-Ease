import React from 'react';
import { FaShieldAlt, FaTicketAlt, FaHeart } from 'react-icons/fa';
import './features.css';

const Features = () => {
  const featureData = [
    {
      id: 1,
      icon: <FaShieldAlt className="feature-icon" />,
      title: "Verified Devotion",
      desc: "Partnered exclusively with authentic and verified temples across the country to ensure your spiritual journey is pure and protected."
    },
    {
      id: 2,
      icon: <FaTicketAlt className="feature-icon" />,
      title: "Seamless Booking",
      desc: "Our premium Journey Planner allows you to instantly secure Darshan slots, bus, train, and flight tickets all in one unified platform."
    },
    {
      id: 3,
      icon: <FaHeart className="feature-icon" />,
      title: "Spiritual Harmony",
      desc: "Immerse yourself in our beautifully crafted interface designed to evoke a sense of peace, devotion, and divine presence before you even arrive."
    }
  ];

  return (
    <div className='features-container' id='features'>
      <div className="features-header">
        <h3 className="features-subtitle">Why Choose DarshanEase</h3>
        <h1 className='features-heading'>The Ultimate Portal to the Divine</h1>
      </div>

      <div className='features-grid'>
        {featureData.map((f) => (
          <div key={f.id} className='feature-card-premium'>
            <div className="feature-icon-wrapper">
                {f.icon}
            </div>
            <h2>{f.title}</h2>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
