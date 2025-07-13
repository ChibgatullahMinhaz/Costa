const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser, updateStatus, getUserByEmail, userBanned, driverBanned } = require('../controllers/UserController/userController');
const { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver, getActiveDrivers, getTotalActiveDrivers, getDriversByStatus, updateDriverStatus } = require('../controllers/driverController/driverController');
const { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, getVehiclesByType, getVehicleTypesWithPrices } = require('../controllers/vehicleController/vehicleController');
const { sendNotification, getAllNotifications } = require('../controllers/Notification/notification');
const { getServer, getRecentActivity } = require('../controllers/projectController');
const { processPayment } = require('../controllers/payment/payment');
const { createBooking, getTotalBookings, getTotalCustomers, getMyBookingsByEmail, getAllBookings, deleteBooking, updateBookingByAdmin, updateBooking, getBookingById, cancelBooking } = require('../controllers/Bookings/Bookings');
const router = express.Router();


// universal or user api's
router.get("/", getServer);
router.get("/api/activity", getRecentActivity);

// General apis for all user => Users
router.get("/api/getAllCarByType", getVehiclesByType);
router.get("/api/getAllCarTypeWithPrices", getVehicleTypesWithPrices);

// payments
router.post('/api/create-checkout-session', processPayment)

// make bookings
router.post('/api/createBooking', createBooking)

router.get("/api/userByEmail", getUserByEmail);
router.post("/api/user/create", createUser);

// Notifications
router.post("/api/notification/send", sendNotification);
router.get("/api/notification", getAllNotifications);


// admin api's
router.get("/api/user", getUsers);
router.put("/api/user/update/:id", updateUser);
router.delete("/api/user/delete/:id", deleteUser);
router.patch("/api/user/update:id/status", updateStatus);
router.get("/api/userById/:id", getUserById);
router.put('/api/ban/:id', userBanned)

// Drivers
router.get("/api/driver", getDrivers);
router.get("/api/driverById/:id", getDriverById);
router.post("/api/driver/create", createDriver);
router.put("/api/driver/update/:id", updateDriver);
router.delete("/api/driver/delete/:id", deleteDriver);
router.patch("/api/driver/update/:id/status", updateDriverStatus);
router.get("/api/drivers/active", getActiveDrivers);
router.get("/api/drivers/total/active", getTotalActiveDrivers);
router.get("/api/drivers/total/status", getDriversByStatus);
router.put('/api/driver/ban/:id', driverBanned)

// Vehicles
router.get("/api/vehicle", getAllVehicles);
router.get("/api/vehicleById/:id", getVehicleById);
router.post("/api/vehicle/create", createVehicle);
router.put("/api/vehicle/update/:id", updateVehicle);
router.delete("/api/vehicle/delete/:id", deleteVehicle);

// Total bookings
router.get("/api/totalBookings", getTotalBookings);
router.get("/api/myBookings", getMyBookingsByEmail);
router.put("/api/myBookings/update/:id", updateBooking);
router.get("/all-bookings", getAllBookings);
router.delete("/api/booking/delete/:id", deleteBooking);
router.patch("/api/booking/update/status/:id", updateBookingByAdmin);
router.get('/api/bookingById/:id', getBookingById);
router.put("/api/booking/cancel/:id", cancelBooking)
// get total customer
router.get("/api/booking/total-customers", getTotalCustomers);


module.exports = router;
