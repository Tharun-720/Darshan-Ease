import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import './banner.css';

const Banner = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background scrolls slower down (Parallax effect)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  // Foreground content slightly fades and moves up
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div className='hero-container' ref={ref}>
      <motion.div 
        className='announcement-bar'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>🌟 Book your tickets for Temple Darshan now! Limited slots available.</span>
      </motion.div>
       
      <div className='hero-section'>
        <motion.div 
          className="hero-parallax-bg"
          style={{ y: yBg }}
        />
        <div className="hero-overlay" />

        <motion.div 
          className="hero-content"
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Divine Presence
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            Experience the spiritual journey with seamless Darshan bookings and profound devotion.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <MagneticButton padding={20} magneticPull={0.25}>
              <button className="hero-btn primary" onClick={() => {
                  const templesEl = document.getElementById('temples');
                  if(templesEl) templesEl.scrollIntoView({behavior: 'smooth'})
              }}>
                Explore Temples
              </button>
            </MagneticButton>

            <MagneticButton padding={20} magneticPull={0.25}>
              <button className="hero-btn secondary" onClick={() => {
                  const servicesEl = document.getElementById('services');
                  if(servicesEl) servicesEl.scrollIntoView({behavior: 'smooth'})
              }}>
                Our Services
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Banner;