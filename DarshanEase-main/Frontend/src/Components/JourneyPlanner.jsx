import React, { useState } from 'react';
import { FaBus, FaTrain, FaPlane, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './journeyPlanner.css';

const JourneyPlanner = () => {
    const [activeTab, setActiveTab] = useState('bus');
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        
        const { from, to, date } = formData;
        if (!from || !to || !date) return;
        
        // Format the date for generic query params (often DD-MM-YYYY or YYYYMMDD depending on API)
        const dateObj = new Date(date);
        const [day, month, year] = [
             String(dateObj.getDate()).padStart(2, '0'), 
             String(dateObj.getMonth() + 1).padStart(2, '0'), 
             dateObj.getFullYear()
        ];
        
        let targetUrl = '';

        if (activeTab === 'bus') {
            // Real-time Bus API integration pattern (RedBus Schema)
            targetUrl = `https://www.redbus.in/bus-tickets/${from.toLowerCase()}-to-${to.toLowerCase()}?fromCityName=${from}&toCityName=${to}&onward=${day}-${month}-${year}`;
        } else if (activeTab === 'flight') {
            // Switch to a more robust, less strict aggregator that handles partial city matches perfectly 
            const formattedDate = `${day}${month}${year}`;
            targetUrl = `https://www.ixigo.com/search/result/flight/${from.toUpperCase()}/${to.toUpperCase()}/${formattedDate}//1/0/0/e`;
        } else {
            // Train Schema (ConfirmTkt gracefully parses City text strings instead of crashing on missing Station Codes)
            targetUrl = `https://www.confirmtkt.com/train-tickets/${from.toLowerCase()}-to-${to.toLowerCase()}`;
        }

        // Open Real Search Results in New Tab
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="journey-planner-container">
            <div className="journey-planner-glass">
                <h2 className="planner-title">Plan Your Divine Journey</h2>
                
                <div className="planner-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'bus' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bus')}
                        type="button"
                    >
                        <FaBus /> Bus
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'train' ? 'active' : ''}`}
                        onClick={() => setActiveTab('train')}
                        type="button"
                    >
                        <FaTrain /> Train
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'flight' ? 'active' : ''}`}
                        onClick={() => setActiveTab('flight')}
                        type="button"
                    >
                        <FaPlane /> Flight
                    </button>
                </div>

                <form className="planner-form" onSubmit={handleSearch}>
                    <div className="input-row">
                        <div className="input-wrapper">
                            <label><FaMapMarkerAlt /> From</label>
                            <input 
                                type="text" 
                                name="from" 
                                placeholder="Enter Departure City" 
                                value={formData.from} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="input-wrapper">
                            <label><FaMapMarkerAlt /> To</label>
                            <input 
                                type="text" 
                                name="to" 
                                placeholder="Search Temple City" 
                                value={formData.to} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="input-wrapper">
                            <label><FaCalendarAlt /> Date of Travel</label>
                            <input 
                                type="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className="input-wrapper button-wrapper">
                            <button type="submit" className="search-btn">
                                Search {activeTab === 'bus' ? 'Buses' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + 's'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JourneyPlanner;
