const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Auth
router.post('/ulogin', userController.ulogin);
router.post('/usignup', userController.usignup);

// Users
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/useredit/:id', userController.updateUser);
router.delete('/userdelete/:id', userController.deleteUser);

// Darshan
router.get('/darshan/:id', userController.getDarshanById);

// Bookings
router.post('/userbooking', userController.createBooking);
router.get('/getbookings/:userId', userController.getBookingsByUser);
router.get('/getbookings', userController.getAllBookings);
router.delete('/userbookingdelete/:id', userController.deleteBooking);

// Notifications (Outstanding Feature)
router.post('/notifications', userController.createNotification);
router.get('/notifications/:userId', userController.getUserNotifications);
router.put('/notifications/:id/read', userController.markNotificationRead);

module.exports = router;
