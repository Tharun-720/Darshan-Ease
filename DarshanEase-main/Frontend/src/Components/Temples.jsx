import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import './temples.css';
import { Link } from 'react-router-dom';

// Lazy load map to prevent blocking initial render
const TempleMap = React.lazy(() => import('./TempleMap'));

// Fallback high-res images in case the DB doesn't have an image or the link fails
const FALLBACK_IMAGES = [
  "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg"
];

const TempleCard = ({ imageSrc, title, description, linkTo, weather, crowd, openTime, closeTime, location }) => {
  return (
    <div className="temple-card">
      <Link to={linkTo || '/ulogin'} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="temple-image-wrapper">
          <img src={imageSrc} alt={title} className="temple-image" />
          
          {/* Overlay appears on hover */}
          <div className="hover-overlay">
            <strong>Advance Darshan</strong>
            <h3 style={{color: 'var(--secondary)'}}>{title}</h3>
            {location && <p style={{fontSize: '0.8rem', marginBottom: '4px'}}>📍 {location.substring(0, 40)}...</p>}
            <p>{description ? description.substring(0, 80) + '...' : "Click to Register Online Darshan Booking"}</p>
          </div>
        </div>
      </Link>
      
      <div className="temple-content" style={{ position: 'relative' }}>
        <h3>{title}</h3>
        {openTime && closeTime ? (
           <p style={{fontSize:'0.85rem', color: 'gray'}}>Timing: {openTime}AM - {closeTime}PM | Book Now</p>
        ) : (
           <p>Book Darshan Now</p>
        )}

        {/* Live Status Tags */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          right: '15px',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}>
          {weather && (
            <span style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              color: '#333',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {weather}
            </span>
          )}
          {crowd && (
            <span style={{
              background: 'linear-gradient(45deg, #10b981, #059669)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}>
              {crowd}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const TEMPLE_DATA = [
  {
    id: 1,
    imageSrc: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg",
    title: "Shri Thakur Banke Bihari Ji Mandir",
    description: "Click to Register Online Darshan Booking",
    weather: "29°C ☀️", crowd: "Heavy 🚶‍♂️"
  },
  {
    id: 2,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg",
    title: "Shiv Khori Mandir",
    description: "Click to Register Online Darshan Booking",
    weather: "16°C ⛅", crowd: "Moderate 🚶‍♂️"
  },
  {
    id: 3,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
    title: "Tirupati Tirumala Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "32°C ☀️", crowd: "Peak 🧍‍♂️"
  },
  {
    id: 4,
    imageSrc: "https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds",
    title: "Padmanabaswamy Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "31°C 🌧️", crowd: "Moderate 🚶‍♂️"
  },
  {
    id: 5,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg",
    title: "Shirdi Sai Baba Mandir",
    description: "Click to Register Online Darshan Booking",
    weather: "28°C 🌤️", crowd: "Heavy 🚶‍♂️"
  },
  {
    id: 6,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg",
    title: "Golden Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "22°C ☀️", crowd: "Peak 🧍‍♂️"
  },
  {
    id: 7,
    imageSrc: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg",
    title: "Meenakshi Amman Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "34°C ☀️", crowd: "Moderate 🚶‍♂️"
  },
  {
    id: 8,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg",
    title: "Kashi Vishwanath Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "30°C 🌤️", crowd: "Heavy 🚶‍♂️"
  },
  {
    id: 9,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
    title: "Badrinath Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "12°C ⛅", crowd: "Low 🚶‍♂️"
  },
  {
    id: 10,
    imageSrc: "https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds",
    title: "Somnath Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "26°C 🌊", crowd: "Moderate 🚶‍♂️"
  },
  {
    id: 11,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg",
    title: "Jagannath Temple, Puri",
    description: "Click to Register Online Darshan Booking",
    weather: "31°C 🌧️", crowd: "Peak 🧍‍♂️"
  },
  {
    id: 12,
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg",
    title: "Ramanathaswamy Temple",
    description: "Click to Register Online Darshan Booking",
    weather: "28°C 🌤️", crowd: "Moderate 🚶‍♂️"
  }
];

const Temples = () => {
  const [temples, setTemples] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [isLoading, setIsLoading] = useState(true);

  // Determine if the user is authenticated to direct them to the booking page directly
  const isAuth = !!localStorage.getItem('user');

  useEffect(() => {
    // Fetch real temple data from the backend organizer DB with a short timeout
    axios.get('http://localhost:7000/organizer/gettemples', { timeout: 1000 })
      .then((res) => {
        if (res.data && res.data.length > 0) {
           let fetchedTemples = res.data;
           // Artificially duplicate the backend temples so the Grid view appears full
           // and the "Load More" functionality can be demonstrated properly.
           let displayTemples = [...fetchedTemples];
           while (displayTemples.length < 24) {
               displayTemples = [...displayTemples, ...fetchedTemples];
           }
           setTemples(displayTemples);
        } else {
           setTemples(TEMPLE_DATA);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("MongoDB is likely offline. Falling back to stunning static templates.", err);
        setTemples(TEMPLE_DATA);
        setIsLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className='temples-container' id='temples'>   
      <h1 className='temples-heading'>Featured Temples</h1>

      {/* View Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <div style={{ 
          background: 'var(--surface-hover)', 
          padding: '5px', 
          borderRadius: '30px', 
          display: 'inline-flex',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <button 
            onClick={() => setViewMode('grid')}
            style={{
              padding: '10px 25px',
              borderRadius: '25px',
              border: 'none',
              background: viewMode === 'grid' ? '#FF7E40' : 'transparent',
              color: viewMode === 'grid' ? 'white' : 'var(--text-color)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: viewMode === 'grid' ? '0 4px 10px rgba(255,126,64,0.3)' : 'none'
            }}
          >
            Grid View
          </button>
          <button 
            onClick={() => setViewMode('map')}
            style={{
              padding: '10px 25px',
              borderRadius: '25px',
              border: 'none',
              background: viewMode === 'map' ? '#FF7E40' : 'transparent',
              color: viewMode === 'map' ? 'white' : 'var(--text-color)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: viewMode === 'map' ? '0 4px 10px rgba(255,126,64,0.3)' : 'none'
            }}
          >
            Interactive Map
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <>
          {isLoading ? (
            <div style={{textAlign: 'center', padding: '50px'}}>Loading Sacred Data...</div>
          ) : (
            <div className='temples-grid'>
              {temples.slice(0, visibleCount).map((temple, idx) => {
                // Ensure the database image uses the localhost proxy or a fallback
                const imgSrc = temple.templeImage 
                  ? `http://localhost:7000/organizer/${temple.templeImage}` 
                  : FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
                
                return (
                  <TempleCard 
                    key={temple._id || idx}
                    imageSrc={imgSrc}
                    title={temple.templeName || temple.title || "Sacred Temple"}
                    description={temple.description}
                    linkTo={isAuth ? `/utemple/${temple._id || temple.id}` : '/ulogin'}
                    openTime={temple.open}
                    closeTime={temple.close}
                    location={temple.location}
                    weather="26°C ☀️" 
                    crowd="Active 🚶‍♂️"
                  />
                );
              })}
            </div>
          )}

          {!isLoading && visibleCount < temples.length && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                onClick={handleLoadMore}
                className="magnetic-btn-wrapper"
                style={{
                  padding: '12px 30px', 
                  fontSize: '1.2rem', 
                  fontFamily: 'Cinzel, serif', 
                  backgroundColor: '#FF7E40', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  display: 'inline-block',
                  visibility: 'visible',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease, background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Load More Temples
              </button>
            </div>
          )}
        </>
      ) : (
        <Suspense fallback={<div style={{textAlign: 'center', padding: '50px'}}>Loading Interactive Map...</div>}>
          <TempleMap />
        </Suspense>
      )}
    </div>
  );
}

export default Temples;
