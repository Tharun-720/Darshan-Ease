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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const { from, to, date } = formData;

        if (!from || !to || !date) {
            alert("Please fill all fields.");
            return;
        }

        // Convert YYYY-MM-DD to DD-MM-YYYY
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}-${month}-${year}`;

        let targetUrl = "";

        if (activeTab === "bus") {
            targetUrl = `https://www.redbus.in/bus-tickets/${encodeURIComponent(
                from.toLowerCase()
            )}-to-${encodeURIComponent(
                to.toLowerCase()
            )}?fromCityName=${encodeURIComponent(
                from
            )}&toCityName=${encodeURIComponent(
                to
            )}&onward=${formattedDate}`;
        } else if (activeTab === "flight") {
            const flightDate = `${day}${month}${year}`;
            targetUrl = `https://www.ixigo.com/search/result/flight/${from.toUpperCase()}/${to.toUpperCase()}/${flightDate}//1/0/0/e`;
        } else {
            targetUrl = `https://www.confirmtkt.com/train-tickets/${encodeURIComponent(
                from.toLowerCase()
            )}-to-${encodeURIComponent(to.toLowerCase())}`;
        }

        window.open(targetUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="journey-planner-container">
            <div className="journey-planner-glass">
                <h2 className="planner-title">Plan Your Divine Journey</h2>

                <div className="planner-tabs">
                    <button
                        className={`tab-btn ${activeTab === "bus" ? "active" : ""}`}
                        onClick={() => setActiveTab("bus")}
                        type="button"
                    >
                        <FaBus /> Bus
                    </button>

                    <button
                        className={`tab-btn ${activeTab === "train" ? "active" : ""}`}
                        onClick={() => setActiveTab("train")}
                        type="button"
                    >
                        <FaTrain /> Train
                    </button>

                    <button
                        className={`tab-btn ${activeTab === "flight" ? "active" : ""}`}
                        onClick={() => setActiveTab("flight")}
                        type="button"
                    >
                        <FaPlane /> Flight
                    </button>
                </div>

                <form className="planner-form" onSubmit={handleSearch}>
                    <div className="input-row">

                        <div className="input-wrapper">
                            <label>
                                <FaMapMarkerAlt /> From
                            </label>
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
                            <label>
                                <FaMapMarkerAlt /> To
                            </label>
                            <input
                                type="text"
                                name="to"
                                placeholder="Enter Destination City"
                                value={formData.to}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label>
                                <FaCalendarAlt /> Date of Travel
                            </label>
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
                                Search{" "}
                                {activeTab === "bus"
                                    ? "Buses"
                                    : activeTab === "train"
                                    ? "Trains"
                                    : "Flights"}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default JourneyPlanner;