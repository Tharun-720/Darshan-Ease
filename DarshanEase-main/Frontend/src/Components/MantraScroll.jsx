import React from 'react';
import './mantraScroll.css';

const MantraScroll = () => {
  // A string of mantras repeated to ensure it fills the screen for smooth looping
  const mantras = [
    "Om Namah Shivaya", "Hare Krishna", "Jai Shri Ram", 
    "Sri Venkatesaāya Namaha", "Radhe Radhe", "Om Ganapataye Namaha"
  ];
  
  // Render the mantras with a glowing star separator
  const renderMantras = () => {
    return mantras.map((mantra, index) => (
      <React.Fragment key={index}>
        <span className="mantra-text">{mantra}</span>
        <span className="mantra-icon">✦</span>
      </React.Fragment>
    ));
  };
  
  return (
    <div className="mantra-container">
      <div className="mantra-scroll">
         {/* We render it twice to create a seamless infinite loop */}
        <div className="mantra-track">
            {renderMantras()} {renderMantras()} {renderMantras()}
        </div>
        <div className="mantra-track">
            {renderMantras()} {renderMantras()} {renderMantras()}
        </div>
      </div>
    </div>
  );
};

export default MantraScroll;
