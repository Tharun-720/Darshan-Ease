import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import './templegallery.css';

import img1 from '../assets/gallery-1.jpg';
import img2 from '../assets/gallery-2.jpg';
import img3 from '../assets/gallery-3.jpg';
import img4 from '../assets/gallery-4.jpg';
import img5 from '../assets/gallery-5.jpg';
import img6 from '../assets/gallery-6.jpg';

const galleryImages = [
  { id: 1, url: img1, title: "Golden Temple at Dawn", span: "tall" },
  { id: 2, url: img2, title: "Meenakshi Amman Skyline", span: "wide" },
  { id: 3, url: img3, title: "Kashi Ghats at Night", span: "square" },
  { id: 4, url: img4, title: "South Indian Architecture", span: "tall" },
  { id: 5, url: img5, title: "Temple Chariot Carvings", span: "square" },
  { id: 6, url: img6, title: "Himalayan Shrine", span: "wide" }
];

const TempleGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-header">
        <h2 className="title-section" style={{ textAlign: 'center' }}>
          Divine <span style={{ color: '#FF7E40' }}>Glimpses</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '40px' }}>
          Immerse yourself in the architectural marvels of India's most sacred temples.
        </p>
      </div>

      <div className="masonry-grid">
        {galleryImages.map((image, index) => (
          <motion.div 
            key={image.id}
            className={`grid-item ${image.span}`}
            layoutId={`gallery-image-${image.id}`}
            onClick={() => setSelectedImage(image)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="image-overlay">
              <span>{image.title}</span>
            </div>
            <img src={image.url} alt={image.title} loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <IoCloseOutline size={40} />
            </button>

            <motion.div 
              className="lightbox-content"
              layoutId={`gallery-image-${selectedImage.id}`}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing backdrop
            >
              <img src={selectedImage.url} alt={selectedImage.title} />
              <motion.div 
                className="lightbox-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3>{selectedImage.title}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TempleGallery;
