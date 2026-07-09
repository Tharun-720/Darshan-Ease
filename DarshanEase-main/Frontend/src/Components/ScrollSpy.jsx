import React, { useState, useEffect } from 'react';

const ScrollSpy = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // We are tracking the IDs of the main sections on the homepage.
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'temples', label: 'Temples' },
    { id: 'services', label: 'Services' },
    { id: 'blogs', label: 'Spiritual Blogs' },
    { id: 'footer', label: 'Contact' }
  ];

  useEffect(() => {
    // Zero-dependency Intersection Observer to track scroll depth natively
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px', // Trigger when section crosses upper-middle threshold
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      right: '25px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      zIndex: 1040, // Below modal, above content
      padding: '20px 10px',
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '30px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.6)'
    }}>
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        
        return (
          <div 
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={(e) => {
                const label = e.currentTarget.querySelector('.spy-label');
                if (label) {
                  label.style.opacity = '1';
                  label.style.transform = 'translateY(-50%) translateX(0)';
                }
            }}
            onMouseLeave={(e) => {
                const label = e.currentTarget.querySelector('.spy-label');
                if (label && !isActive) {
                  label.style.opacity = '0';
                  label.style.transform = 'translateY(-50%) translateX(10px)';
                }
            }}
            style={{
              position: 'relative',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: isActive ? '#FF7E40' : 'rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: isActive ? 'scale(1.3)' : 'scale(1)',
              boxShadow: isActive ? '0 0 10px rgba(255, 126, 64, 0.6)' : 'none'
            }}
          >
            {/* Tooltip Label */}
            <span 
              className="spy-label"
              style={{
                position: 'absolute',
                right: '25px',
                top: '50%',
                transform: isActive ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(10px)',
                background: isActive ? '#FF7E40' : 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                fontFamily: 'Cinzel, serif',
                whiteSpace: 'nowrap',
                opacity: isActive ? '1' : '0',
                transition: 'all 0.3s ease',
                pointerEvents: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {section.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ScrollSpy;
