import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';
import { FaTicketAlt, FaInfoCircle, FaCheckCircle, FaRupeeSign } from 'react-icons/fa';

function BookDarshan() {
  const [item, setItem] = useState({});
  const [selectedDarshan, setSelectedDarshan] = useState('normal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phno: '',
  });

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  useEffect(() => {
    setIsLoading(true);
    
    // Support composite ID (darshanID_templeID)
    const [darshanId, templeId] = id.includes('_') ? id.split('_') : [id, id];

    axios.get(`http://localhost:7000/user/darshan/${darshanId}`)
      .then((resp) => {
        setItem(resp.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn("Backend offline, loading Prototype Darshan Item for Temple:", templeId);
        
        // Dynamic Lookup for Offline Proto
        const MOCK_DATA = {
            1: { name: "Shri Thakur Banke Bihari Ji Mandir", loc: "Vrindavan, UP", img: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg" },
            2: { name: "Shiv Khori Mandir", loc: "Reasi, J&K", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg" },
            3: { name: "Tirupati Tirumala Temple", loc: "Chittoor, AP", img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg" },
            4: { name: "Padmanabaswamy Temple", loc: "Thiruvananthapuram, Kerala", img: "https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds" },
            5: { name: "Shirdi Sai Baba Mandir", loc: "Shirdi, Maharashtra", img: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg" },
            6: { name: "Golden Temple (Harmandir Sahib)", loc: "Amritsar, Punjab", img: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg" },
            7: { name: "Meenakshi Amman Temple", loc: "Madurai, Tamil Nadu", img: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg" },
            8: { name: "Kashi Vishwanath Temple", loc: "Varanasi, UP", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg" },
            9: { name: "Badrinath Temple", loc: "Badrinath, Uttarakhand", img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg" },
            10: { name: "Somnath Temple", loc: "Veraval, Gujarat", img: "https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds" },
            11: { name: "Jagannath Temple", loc: "Puri, Odisha", img: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg" },
            12: { name: "Ramanathaswamy Temple", loc: "Rameswaram, Tamil Nadu", img: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg" },
        };

        // If ID is not a number, try to match it or default
        const cleanId = !isNaN(templeId) ? parseInt(templeId) : 1;
        const info = MOCK_DATA[templeId] || MOCK_DATA[cleanId] || MOCK_DATA[1];

        setItem({
          _id: darshanId,
          organizerName: "Shrine Board Trust",
          organizerId: "mockOrg123",
          description: "Experience the divine presence in this sacred timeslot. Open for all devotees.",
          templeName: info.name,
          darshanName: darshanId === 'd2' ? "Evening Aarti" : "Special Darshan",
          location: info.loc,
          templeImage: info.img,
          open: "05:00",
          close: "22:00",
          prices: { normal: 0, vip: 550 }
        });
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDarshan = (e) => setSelectedDarshan(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!item || !item.organizerName || !item.organizerId || !item.description || !item.templeName || !item.darshanName || !item.close || !item.open || !item.prices || !item.location || !item.templeImage) {
        throw new Error('Item data is missing required properties');
      }

      const { organizerName, description, prices, darshanName, templeName, location, templeImage, organizerId, close, open } = item;
      const totalAmount = parseInt(prices[selectedDarshan] * quantity, 10) + 49;
      
      const updatedFormData = {
        ...formData,
        quantity: quantity,
        totalamount: totalAmount,
        organizerName: organizerName,
        organizerId: organizerId,
        description: description,
        templeName: templeName,
        darshanName: darshanName,
        location: location,
        templeImage: templeImage,
        open: open,
        close: close,
      };

      const user = JSON.parse(localStorage.getItem('user'));
      updatedFormData.userId = user.id;
      updatedFormData.userName = user.name;

      try {
        await axios.post('http://localhost:7000/user/userbooking', updatedFormData);
      } catch (postError) {
        console.warn("Backend offline! Saving booking to LocalStorage Prototype DB.");
        const mockBookings = JSON.parse(localStorage.getItem('mockBookings') || '[]');
        // Add random booking ID
        updatedFormData._id = Math.random().toString(36).substring(2, 10);
        // Add current timestamp for Mock Date
        updatedFormData.date = new Date().toISOString(); 
        mockBookings.push(updatedFormData);
        localStorage.setItem('mockBookings', JSON.stringify(mockBookings));
      }

      alert('Booked successfully!');
      navigate('/mybookings');
    } catch (error) {
      console.error('Error booking:', error);
    }
  };

  const getPrice = () => item?.prices ? parseInt(item.prices[selectedDarshan]) : 0;
  const subtotal = getPrice() * quantity;
  const convenienceFee = 49;
  const total = subtotal + convenienceFee;

  return (
    <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh", color: "var(--text-color)" }}>
      <Unavbar />
      
      <div className="container mx-auto px-4 py-12 flex justify-center">
        {isLoading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mt-20"></div>
        ) : (
          <div className="w-full max-w-5xl" style={{
            background: 'var(--surface)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div className="md:flex">
              {/* Left Side: Form */}
              <div className="md:w-3/5 p-8 md:p-12">
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '10px' }}>
                  Secure Your Darshan
                </h2>
                <p className="opacity-70 mb-8 flex items-center">
                  <FaInfoCircle className="mr-2 text-orange-400"/> Enter your details to confirm your Spiritual Journey.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 opacity-80">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required
                      className="w-full p-4 rounded-xl border-2 border-transparent bg-gray-50 dark:bg-gray-800 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Enter primary devotee's name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 opacity-80">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required
                        className="w-full p-4 rounded-xl border-2 border-transparent bg-gray-50 dark:bg-gray-800 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 opacity-80">Phone Number</label>
                      <input 
                        type="text" 
                        name="phno" 
                        value={formData.phno} 
                        onChange={handleChange} 
                        required
                        className="w-full p-4 rounded-xl border-2 border-transparent bg-gray-50 dark:bg-gray-800 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="+91..."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <label className="block text-sm font-semibold mb-4 opacity-80">Darshan Category</label>
                    <div className="flex gap-4">
                      <label style={{ flex: 1, cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="darshanType" 
                          value="normal" 
                          checked={selectedDarshan === 'normal'} 
                          onChange={handleChangeDarshan} 
                          className="hidden"
                        />
                        <div style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: `2px solid ${selectedDarshan === 'normal' ? 'var(--secondary)' : 'var(--border-color)'}`,
                          backgroundColor: selectedDarshan === 'normal' ? 'rgba(255, 126, 64, 0.1)' : 'transparent',
                          textAlign: 'center',
                          transition: 'all 0.2s'
                        }}>
                          <span className="block font-bold mb-1">Normal Darshan</span>
                          <span className="text-sm opacity-70">₹{item?.prices?.normal} / person</span>
                        </div>
                      </label>
                      
                      <label style={{ flex: 1, cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="darshanType" 
                          value="vip" 
                          checked={selectedDarshan === 'vip'} 
                          onChange={handleChangeDarshan} 
                          className="hidden"
                        />
                        <div style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: `2px solid ${selectedDarshan === 'vip' ? 'var(--secondary)' : 'var(--border-color)'}`,
                          backgroundColor: selectedDarshan === 'vip' ? 'rgba(255, 126, 64, 0.1)' : 'transparent',
                          textAlign: 'center',
                          transition: 'all 0.2s'
                        }}>
                          <span className="block font-bold mb-1 text-orange-500">VIP / Special</span>
                          <span className="text-sm opacity-70">₹{item?.prices?.vip} / person</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                    <span className="font-bold text-lg">Number of Devotees</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={decrease} className="w-10 h-10 rounded-full border border-orange-500 text-orange-500 flex justify-center items-center hover:bg-orange-500 hover:text-white transition-colors">-</button>
                      <span className="text-2xl font-bold w-6 text-center">{quantity}</span>
                      <button type="button" onClick={increase} className="w-10 h-10 rounded-full border border-orange-500 text-orange-500 flex justify-center items-center hover:bg-orange-500 hover:text-white transition-colors">+</button>
                    </div>
                  </div>

                </form>
              </div>

              {/* Right Side: Summary */}
              <div className="md:w-2/5 p-8 md:p-12 text-white flex flex-col justify-between" style={{
                background: 'linear-gradient(135deg, #ff8c00 0%, #ff4500 100%)',
              }}>
                <div>
                  <h3 className="text-2xl font-bold font-serif border-b border-white/20 pb-4 mb-6 flex items-center">
                    <FaTicketAlt className="mr-3"/> Booking Summary
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="block text-sm text-white/70 uppercase tracking-wide text-xs font-bold mb-1">Temple</span>
                      <strong className="text-xl">{item.templeName}</strong>
                    </div>
                    <div>
                      <span className="block text-sm text-white/70 uppercase tracking-wide text-xs font-bold mb-1">Darshan Timing</span>
                      <strong>{item.time || item.open + ' AM'} - {item.date || 'Daily'}</strong>
                    </div>
                    <div>
                      <span className="block text-sm text-white/70 uppercase tracking-wide text-xs font-bold mb-1">Type</span>
                      <strong className="capitalize">{selectedDarshan} Pass x {quantity}</strong>
                    </div>
                  </div>

                  <div className="space-y-3 py-6 border-y border-white/20">
                    <div className="flex justify-between text-sm">
                      <span>Ticket Price ({quantity}x)</span>
                      <span>₹ {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Convenience Fee</span>
                      <span>₹ {convenienceFee}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-lg font-bold uppercase">Total Payable</span>
                    <span className="text-3xl font-bold">₹ {total}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-white/80 mb-4 flex items-center">
                    <FaCheckCircle className="mr-2"/> Secure, encrypted transaction.
                  </p>
                  <button 
                    onClick={handleSubmit}
                    type="submit" 
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'white',
                      color: '#ff4500',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Confirm & Pay
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDarshan;
