import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';
import { FaClock, FaMapMarkerAlt, FaUserTie, FaInfoCircle } from 'react-icons/fa';

// Mock Authentic Temple Data for Offline Prototype Mode
const MOCK_TEMPLE_INFO = {
    1: { name: "Shri Thakur Banke Bihari Ji Mandir", loc: "Vrindavan, UP", desc: "One of the holiest temples in India, dedicated to Lord Krishna. The deity is worshipped as a child. It is famous for its unique 'Bihari' style of worship and the Jhulan Yatra festival.", img: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg" },
    2: { name: "Shiv Khori Mandir", loc: "Reasi, J&K", desc: "A famous cave shrine of Lord Shiva situated in the Reasi district. The cave is a mile long and contains a natural Shiva Lingam. It is known for its stalactite and stalagmite formations.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg" },
    3: { name: "Tirupati Tirumala Temple", loc: "Chittoor, AP", desc: "The richest temple in the world, dedicated to Lord Venkateswara. Situated atop the Tirumala hills, it attracts millions of devotees annually. Known for its Dravidian architecture and Laddu Prasadam.", img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg" },
    4: { name: "Padmanabaswamy Temple", loc: "Thiruvananthapuram, Kerala", desc: "Built in an intricate blend of the Chera and Dravidian styles, this temple is dedicated to Lord Vishnu in the 'Anantha Shayanam' posture. It is known as the wealthiest place of worship in the world.", img: "https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds" },
    5: { name: "Shirdi Sai Baba Mandir", loc: "Shirdi, Maharashtra", desc: "A spiritual place dedicated to the 19th-century saint Sai Baba. It is a major pilgrimage site where people of all faiths come to seek blessings and find peace.", img: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg" },
    6: { name: "Golden Temple (Harmandir Sahib)", loc: "Amritsar, Punjab", desc: "The holiest Gurdwara of Sikhism. It is famous for its stunning gilded architecture and the Langar, which serves free food to thousands of people every day regardless of religion.", img: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg" },
    7: { name: "Meenakshi Amman Temple", loc: "Madurai, Tamil Nadu", desc: "A historic Hindu temple located on the southern bank of the Vaigai River. It is dedicated to Meenakshi, a form of Parvati, and her consort Sundareswarar, a form of Shiva.", img: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1677258515580_post_image_1.jpg" },
    8: { name: "Kashi Vishwanath Temple", loc: "Varanasi, UP", desc: "One of the most famous Hindu temples dedicated to Lord Shiva. It is located in Varanasi, the holiest city of Hindus, on the western bank of the Ganges.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Shiv_khori_2.jpg/1200px-Shiv_khori_2.jpg" },
    9: { name: "Badrinath Temple", loc: "Badrinath, Uttarakhand", desc: "A holy shrine dedicated to Lord Vishnu, part of the Char Dham pilgrimage. Situated in the Garhwal hill tracks along the Alaknanda River.", img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg" },
    10: { name: "Somnath Temple", loc: "Veraval, Gujarat", desc: "The first among the twelve Jyotirlinga shrines of Shiva. It is a symbol of Indian resilience, having been reconstructed several times after being destroyed by invaders.", img: "https://imageio.forbes.com/blogs-images/jimdobson/files/2016/05/Sree_Padmanabhaswamy_Temple.jpg?height=459&width=711&fit=bounds" },
    11: { name: "Jagannath Temple", loc: "Puri, Odisha", desc: "Famous for its annual Ratha Yatra, or chariot festival. The temple is sacred to the Hindu traditions of Vaishnavism and is one of the Char Dham pilgrimage sites.", img: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Sai_baba_samadhi_mandir_.jpg" },
    12: { name: "Ramanathaswamy Temple", loc: "Rameswaram, Tamil Nadu", desc: "Dedicated to Lord Shiva, it is one of the Char Dham and houses one of the 12 Jyotirlingas. It is famous for its long corridors and sculpted pillars.", img: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg" },
};

const Utemple = () => {
    const [item, setItem] = useState(null);
    const [darshan, setDarshan] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:7000/organizer/gettemplebyid/${id}`, { timeout: 1000 })
            .then((resp) => {
                if(resp.data) {
                    setItem(resp.data);
                    const organizerId = resp.data.organizerId;
                    axios.get(`http://localhost:7000/organizer/getdarshans/${organizerId}`, { timeout: 1000 })
                        .then((response) => {
                            setDarshan(response.data);
                            setIsLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error fetching darshan: ', error);
                            setDarshan([
                                { _id: 'd1', darshanName: 'Morning Aarti', time: '08:30', date: 'Daily', prices: { normal: 0, vip: 500 }, description: 'Experience morning bliss.' },
                                { _id: 'd2', darshanName: 'Evening Darshan', time: '18:00', date: 'Daily', prices: { normal: 0, vip: 600 }, description: 'Sunset rituals.' }
                            ]);
                            setIsLoading(false);
                        });
                } else {
                    throw new Error("No data found");
                }
            })
            .catch(() => {
                console.log("Activating Dynamic Offline Prototype for ID:", id);
                const info = MOCK_TEMPLE_INFO[id] || MOCK_TEMPLE_INFO[1];
                setItem({
                    _id: id,
                    templeName: info.name,
                    location: info.loc,
                    open: "05:00",
                    close: "22:00",
                    organizerName: "Shrine Board Trust",
                    description: info.desc,
                    templeImage: info.img
                });
                setDarshan([
                    { _id: 'd1', darshanName: 'Special Darshan', time: '08:00 - 12:00', date: 'Daily', prices: { normal: 0, vip: 500 }, description: 'Experience the divine presence in the morning energy.' },
                    { _id: 'd2', darshanName: 'Evening Aarti', time: '17:00 - 20:00', date: 'Daily', prices: { normal: 0, vip: 750 }, description: 'Atmospheric ritual with thousands of lamps and chants.' }
                ]);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh", color: "var(--text-color)" }}>
            <Unavbar />
            
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
                </div>
            ) : item && (
                <>
                    {/* Hero Section */}
                    <div style={{
                        position: 'relative',
                        height: '50vh',
                        width: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'flex-end',
                        paddingBottom: '40px'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundImage: `url(${item.templeImage?.startsWith('http') ? item.templeImage : `http://localhost:7000/organizer/${item.templeImage}`})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.6)'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(to top, var(--bg-color) 0%, transparent 100%)'
                        }} />
                        
                        <div className="container mx-auto px-6 relative z-10">
                            <h1 style={{ fontSize: '3.5rem', fontFamily: 'Cinzel, serif', color: '#fff', textShadow: '0 4px 6px rgba(0,0,0,0.5)', marginBottom: '10px' }}>
                                {item.templeName || item.eventName}
                            </h1>
                            <div style={{ display: 'flex', gap: '20px', color: '#e5e7eb', fontSize: '1.1rem' }}>
                                <span className="flex items-center"><FaMapMarkerAlt className="mr-2 text-orange-400"/> {item.location}</span>
                                <span className="flex items-center"><FaClock className="mr-2 text-orange-400"/> {item.open} AM - {item.close} PM</span>
                                <span className="flex items-center"><FaUserTie className="mr-2 text-orange-400"/> {item.organizerName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="container mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <div style={{
                                    background: 'var(--surface)',
                                    padding: '30px',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    marginBottom: '40px',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                                        <FaInfoCircle className="mr-3" /> Temple History & Significance
                                    </h2>
                                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-color)', opacity: 0.9 }}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-1">
                                <div style={{
                                    background: 'linear-gradient(145deg, var(--surface), var(--surface-hover))',
                                    padding: '30px',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    border: '1px solid var(--border-color)',
                                    position: 'sticky',
                                    top: '100px'
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary)', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
                                        Quick Info
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                            <span className="font-semibold opacity-70">Opening Time</span>
                                            <span>{item.open} AM</span>
                                        </li>
                                        <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                            <span className="font-semibold opacity-70">Closing Time</span>
                                            <span>{item.close} PM</span>
                                        </li>
                                        <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                                            <span className="font-semibold opacity-70">Trust/Organizer</span>
                                            <span>{item.organizerName}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Darshan Section */}
                        <div className="mt-16">
                            <h2 style={{ fontSize: '2.5rem', fontFamily: 'Cinzel, serif', textAlign: 'center', marginBottom: '40px', color: 'var(--primary)' }}>
                                Available Darshan Slots & Aarti
                            </h2>
                            
                            {darshan.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {darshan.map((dItem) => (
                                        <div key={dItem._id} style={{
                                            background: 'var(--surface)',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                            border: '1px solid var(--border-color)',
                                            transition: 'transform 0.3s ease',
                                        }} className="hover:transform hover:-translate-y-2">
                                            <div style={{ background: 'linear-gradient(90deg, #ff8c00, #ff4500)', padding: '20px', color: 'white', textAlign: 'center' }}>
                                                <h3 className="text-2xl font-bold font-serif">{dItem.darshanName}</h3>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                                                    <div>
                                                        <p className="text-sm opacity-60 uppercase font-bold">Timing</p>
                                                        <p className="font-semibold" style={{ color: "var(--text-color)" }}>{dItem.time || `${item.open} AM`} </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm opacity-60 uppercase font-bold">Date</p>
                                                        <p className="font-semibold" style={{ color: "var(--text-color)" }}>{dItem.date || "Daily"}</p>
                                                    </div>
                                                </div>
                                                <div className="mb-6 space-y-2">
                                                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                                        <span className="font-medium" style={{ color: "var(--text-color)" }}>Normal Darshan</span>
                                                        <span className="font-bold text-orange-500">₹{dItem.prices?.normal || '0'}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                                        <span className="font-medium" style={{ color: "var(--text-color)" }}>VIP / Special</span>
                                                        <span className="font-bold text-orange-500">₹{dItem.prices?.vip || '0'}</span>
                                                    </div>
                                                </div>
                                                <div className="mb-6 text-sm opacity-80 leading-relaxed" style={{ color: "var(--text-color)" }}>
                                                    {dItem.description ? `${dItem.description.slice(0, 100)}...` : "Experience the divine presence in this sacred timeslot."}
                                                </div>
                                                <Link to={`/bookdarshan/${dItem._id}_${item._id}`} style={{ width: '100%' }} className="block">
                                                    <button style={{
                                                        width: '100%',
                                                        padding: '14px',
                                                        background: 'var(--primary)',
                                                        color: '#fff',
                                                        borderRadius: '12px',
                                                        fontWeight: 'bold',
                                                        fontSize: '1.1rem',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 4px 15px rgba(255, 126, 64, 0.4)'
                                                    }}>
                                                        Book Tickets
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12" style={{ background: 'var(--surface)', borderRadius: '20px' }}>
                                    <h3 className="text-2xl opacity-60" style={{ color: "var(--text-color)" }}>No Specific Darshans listed yet.</h3>
                                    <p className="mt-2 text-orange-500">Temple is open for general arrival.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Utemple;
