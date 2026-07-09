import React from 'react';
import Unavbar from './Unavbar';
import Temples from '../Components/Temples';
import Footer from '../Components/Footer';

const Utemples = () => {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Unavbar />
      <div style={{ minHeight: '80vh', padding: '40px 0' }}>
        <Temples />
      </div>
      <Footer />
    </div>
  );
};

export default Utemples;
