import React from 'react';

const TempleMap = () => {
  return (
    <div style={{ height: '70vh', width: '100%', borderRadius: '15px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'}}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14619711.666993888!2d68.9959556157125!3d22.31688582236306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stemples%20in%20india!5e0!3m2!1sen!2sin!4v1709420993096!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Interactive Temple Map of India"
      ></iframe>
    </div>
  );
};

export default TempleMap;
