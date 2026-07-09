import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './notification.css';

const NotificationDropdown = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch Notifications
    const fetchNotifications = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/user/notifications/${userId}`);
            setNotifications(res.data);
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchNotifications();
            // Polling every 30 seconds for real-time feel
            const interval = setInterval(fetchNotifications, 30000);
            return () => clearInterval(interval);
        }
    }, [userId]);

    // Handle outside click to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.put(`http://localhost:7000/user/notifications/${id}/read`);
            setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
        } catch (error) {
            console.error("Error marking as read", error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notification-container" ref={dropdownRef}>
            <div className="notification-bell" onClick={() => setIsOpen(!isOpen)}>
                🔔
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </div>

            {isOpen && (
                <div className="notification-dropdown">
                    <h4 className="dropdown-header">Notifications</h4>
                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <p className="no-notifications">No new messages from DarshanEase.</p>
                        ) : (
                            notifications.map(nav => (
                                <div key={nav._id} className={`notification-item ${!nav.read ? 'unread' : ''}`}>
                                    <p>{nav.message}</p>
                                    {!nav.read && (
                                        <button className="mark-read-btn" onClick={(e) => markAsRead(nav._id, e)}>
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
