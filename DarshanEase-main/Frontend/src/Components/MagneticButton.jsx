import React, { useRef, useState, useEffect } from 'react';

/**
 * A highly-reusable "Magnetic" wrapper.
 * When the user's cursor hovers over this element, it natively calculates
 * the distance and strictly pulls the child element towards the cursor,
 * giving it a premium, physics-based tactile feel.
 */
const MagneticButton = ({ children, padding = 30, magneticPull = 0.4 }) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isHovered || !containerRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate physics transform pull
      setPosition({ 
        x: distanceX * magneticPull, 
        y: distanceY * magneticPull 
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 }); // Reset position when mouse snaps away
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, magneticPull]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      style={{ 
        display: 'inline-block', 
        padding: `${padding}px`, // Invisible bounding box trigger area
        margin: `-${padding}px` // Negative margin so UI flow isn't disrupted
      }}
    >
      <div 
        ref={elementRef}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          display: 'inline-block'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MagneticButton;
