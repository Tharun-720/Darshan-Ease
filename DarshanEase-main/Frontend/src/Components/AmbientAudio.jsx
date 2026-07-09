import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoVolumeHighOutline, IoVolumeMuteOutline, IoMusicalNotesOutline } from 'react-icons/io5';
import ambientSound from '../assets/ambient.ogg';

const AmbientAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.error("Audio block:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      left: '30px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <audio 
        ref={audioRef} 
        src={ambientSound} 
        loop 
        preload="auto"
      />

      <motion.button
        onClick={toggleAudio}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: isPlaying ? 'rgba(255, 126, 64, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 126, 64, 0.3)',
          boxShadow: isPlaying 
            ? '0 0 20px rgba(255, 126, 64, 0.5)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          color: isPlaying ? 'white' : '#FF7E40',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        {isPlaying ? <IoVolumeHighOutline size={24} /> : <IoVolumeMuteOutline size={24} />}
      </motion.button>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(5px)',
            padding: '8px 15px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontFamily: 'Cinzel, serif',
            fontWeight: 'bold',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}
        >
          <IoMusicalNotesOutline size={16} color="#FF7E40" />
          <span>Ambient Chants</span>
          
          <div style={{ display: 'flex', gap: '3px', marginLeft: '5px' }}>
            {[1, 2, 3].map((bar) => (
              <motion.div
                key={bar}
                animate={{
                  height: ['4px', '12px', '4px'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: bar * 0.2,
                  ease: "easeInOut"
                }}
                style={{
                  width: '3px',
                  backgroundColor: '#FF7E40',
                  borderRadius: '3px'
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AmbientAudio;
