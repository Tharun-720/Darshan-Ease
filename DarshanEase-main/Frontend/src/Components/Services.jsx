import React from 'react';
import './services.css';
import { FaClock, FaOm, FaTicketAlt, FaUserCog } from 'react-icons/fa';

const Services = () => {
  const serviceData = [
    {
      id: 1,
      icon: <FaClock className="service-icon" />,
      title: "Darshan Timings",
      desc: "Explore the divine experience with our regular darshan timings. Witness the spiritual aura and seek blessings from the divine deities."
    },
    {
      id: 2,
      icon: <FaOm className="service-icon" />,
      title: "Special Pooja Services",
      desc: "Elevate your spiritual journey with our special pooja services. Immerse yourself in the sacred rituals and receive blessings from the revered priests."
    },
    {
      id: 3,
      icon: <FaTicketAlt className="service-icon" />,
      title: "Online Ticket Booking",
      desc: "Conveniently book your darshan tickets online. Save time and ensure a seamless entry to the temple premises."
    }
  ];

  return (
    <div className='services-container' id='services'>
      <h1 className='services-heading'>Our Services</h1>

      <div className='services-grid'>
        {serviceData.map((s) => (
          <div key={s.id} className='service-card'>
            {s.icon}
            <h2>{s.title}</h2>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
