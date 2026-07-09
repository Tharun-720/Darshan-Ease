import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import QRCode from "react-qr-code";
import { FaDownload, FaMapMarkerAlt, FaCalendarCheck, FaTicketAlt } from 'react-icons/fa';
import Footer from '../Components/Footer';

function Mybookings() {
  const [items, setItems] = useState([]);  
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const ticketRefs = useRef({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:7000/user/getbookings/${user.id}`)
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn('Backend Offline. Fetching Bookings from LocalStorage Prototype.', error);
          const allMockBookings = JSON.parse(localStorage.getItem('mockBookings') || '[]');
          const userBookings = allMockBookings.filter(b => b.userId === user.id);
          setItems(userBookings);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return formattedDeliveryDate >= currentDate ? 'Upcoming' : 'Completed';
  };

  const preloadImages = (item) => {
    const imagePromises = [];
    imagePromises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.src = `http://localhost:7000/organizer/${item.templeImage}`;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img); // resolve even on error to prevent hanging
      })
    );
    return Promise.all(imagePromises);
  };

  const downloadpdf = async (item) => {
    setSelectedCardId(item._id);
    await preloadImages(item);

    const input = ticketRefs.current[item._id];
    if (!input) return;

    const options = { scale: 2, useCORS: true };

    html2canvas(input, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4', true);
      pdf.setProperties({ title: 'My Darshan Pass' });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, (pdfHeight - 20) / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`DarshanPass_${item._id.slice(0, 8)}.pdf`);
      setSelectedCardId(null);
    });
  };

  return (
    <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh", color: "var(--text-color)" }}>
      <Unavbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '3rem', color: 'var(--secondary)' }}>
            My Booking History
          </h1>
          <p className="opacity-70 mt-2">View and download your sacred Darshan passes.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold opacity-70">No Bookings Found</h2>
            <p className="mt-4 opacity-50">You haven't booked any Darshan slots yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {items.map((item) => {
              const status = calculateStatus(item.date);

              return (
                <div key={item._id} className="relative">
                  {/* Digital Ticket Layout */}
                  <div 
                    ref={el => ticketRefs.current[item._id] = el}
                    style={{
                      background: 'var(--surface)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Ticket Header & Image */}
                    <div style={{ position: 'relative', height: '140px' }}>
                      <img 
                        src={`http://localhost:7000/organizer/${item.templeImage}`} 
                        alt={item.templeName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} 
                        crossOrigin="anonymous"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 text-white">
                        <h3 className="text-2xl font-bold font-serif shadow-sm">{item.templeName}</h3>
                        <p className="flex items-center text-sm opacity-90"><FaMapMarkerAlt className="mr-1 text-orange-400"/> {item.location || 'India'}</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${status === 'Upcoming' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                          {status}
                        </span>
                      </div>
                    </div>

                    {/* Ticket Body */}
                    <div className="p-6 flex flex-col sm:flex-row justify-between relative bg-white dark:bg-gray-900">
                      
                      {/* Left: Details */}
                      <div className="w-full sm:w-2/3 pr-4 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700 border-dashed pb-6 sm:pb-0">
                        <div className="mb-4">
                          <span className="text-xs uppercase font-bold opacity-50 tracking-wider">Pass Holder</span>
                          <p className="font-semibold text-lg">{item.userName}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs uppercase font-bold opacity-50 tracking-wider flex items-center"><FaCalendarCheck className="mr-1"/> Date / Time</span>
                            <p className="font-semibold">{item.BookingDate || 'Anytime'}</p>
                            <p className="font-semibold text-orange-500">{item.open} - {item.close}</p>
                          </div>
                          <div>
                            <span className="text-xs uppercase font-bold opacity-50 tracking-wider flex items-center"><FaTicketAlt className="mr-1"/> Pass Type</span>
                            <p className="font-semibold capitalize">{item.darshanName}</p>
                            <p className="font-semibold opacity-70">{item.quantity} x Devotee(s)</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <span className="uppercase text-xs font-bold opacity-60">Total Paid</span>
                          <span className="font-bold text-lg text-green-600 dark:text-green-400">₹{item.totalamount}</span>
                        </div>
                      </div>

                      {/* Right: QR Code */}
                      <div className="w-full sm:w-1/3 flex flex-col justify-center items-center mt-6 sm:mt-0 pl-0 sm:pl-4">
                        <div className="bg-white p-2 rounded-xl mb-3 border border-gray-200 shadow-sm">
                          <QRCode
                            size={120}
                            value={item._id}
                            viewBox={`0 0 256 256`}
                            fgColor="#000000"
                            bgColor="#ffffff"
                          />
                        </div>
                        <span className="text-xs font-mono opacity-50 tracking-widest break-all px-2 text-center">
                          Txn: {item._id.slice(0, 10).toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Ticket Cutout Semi-circles (Visual only) */}
                      <div className="hidden sm:block absolute top-1/2 -left-3 w-6 h-6 bg-[var(--bg-color)] rounded-full transform -translate-y-1/2 z-10 border-r border-gray-200 dark:border-gray-700" style={{ borderRightStyle: 'solid' }}></div>
                      <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-6 bg-[var(--bg-color)] rounded-full transform -translate-y-1/2 z-10 border-l border-gray-200 dark:border-gray-700" style={{ borderLeftStyle: 'solid' }}></div>
                    </div>
                  </div>

                  {/* Download Action Wrapper */}
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => downloadpdf(item)}
                      disabled={selectedCardId === item._id}
                      className="flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all"
                      style={{
                        background: selectedCardId === item._id ? 'var(--bg-color)' : 'var(--secondary)',
                        color: selectedCardId === item._id ? 'var(--text-muted)' : 'white',
                        border: 'none',
                        cursor: selectedCardId === item._id ? 'wait' : 'pointer'
                      }}
                    >
                      {selectedCardId === item._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-orange-500"></div>
                      ) : (
                        <FaDownload />
                      )}
                      <span>{selectedCardId === item._id ? 'Generating...' : 'Download Pass'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer/>
    </div>
  );
}

export default Mybookings;
