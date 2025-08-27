const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser, updateStatus, getUserByEmail, userBanned, driverBanned } = require('../controllers/UserController/userController');
const { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver, getActiveDrivers, getTotalActiveDrivers, getDriversByStatus, updateDriverStatus, checkDriverApplication } = require('../controllers/driverController/driverController');
const { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, getVehiclesByType, getVehicleTypesWithPrices } = require('../controllers/vehicleController/vehicleController');
const { sendNotification, getAllNotifications, getUserToken } = require('../controllers/Notification/notification');
const { getServer, getRecentActivity } = require('../controllers/projectController');
const { processPayment } = require('../controllers/payment/payment');
const { createBooking, getTotalBookings, getTotalCustomers, getMyBookingsByEmail, getAllBookings, deleteBooking, updateBookingByAdmin, updateBooking, getBookingById, cancelBooking, getInvoiceData } = require('../controllers/Bookings/Bookings');
const { getPricingSettings, updatePricingSettings } = require('../controllers/Pricing/Pricing');
const { getPricingConfig } = require('../controllers/pricingController');
const { assignTrip, updateDriverBookings, getOwnAssingnedRides, updateRideStatusByDriver, getCompletedAssignedRides, getLatestAssignedRides, getRideDetailsByBookingId } = require('../controllers/assignmentController');
const { verifyFirebaseJWT, requireAdmin } = require('../middleware/verifyToken');
const {reapplyApplication} = require('../controllers/driver/driver');
const { getFlightInfo } = require('../controllers/Flight/FlightSearch');
const router = express.Router();


// universal or user api's
router.get("/", getServer);
router.get("/api/activity", getRecentActivity);

// General apis for all user => Users
router.get("/api/getAllCarByType", getVehiclesByType);
router.get("/api/getAllCarTypeWithPrices", getVehicleTypesWithPrices);
router.get("/pricing/config", getPricingConfig);

// payments
router.post('/api/create-checkout-session', processPayment)

// make bookings
router.post('/api/createBooking', createBooking)

router.get("/api/userByEmail", getUserByEmail);
router.post("/api/user/create", createUser);

// Notifications
router.post("/api/notifications/send", verifyFirebaseJWT, requireAdmin, sendNotification);
router.get("/api/notification", getAllNotifications);

router.get('/api/users/fcm-tokens', getUserToken)

// admin api's
router.get("/api/user", verifyFirebaseJWT, requireAdmin, getUsers);
router.put("/api/user/update/:id", verifyFirebaseJWT, requireAdmin, updateUser);
router.delete("/api/user/delete/:id", verifyFirebaseJWT, requireAdmin, deleteUser);
router.patch("/api/user/update:id/status", verifyFirebaseJWT, requireAdmin, updateStatus);
router.get("/api/userById/:id", verifyFirebaseJWT, requireAdmin, getUserById);
router.put('/api/ban/:id', verifyFirebaseJWT, requireAdmin, userBanned)

// Drivers

router.get("/api/driver", verifyFirebaseJWT, requireAdmin, getDrivers);
router.get("/api/driverById/:id", verifyFirebaseJWT, requireAdmin, getDriverById);
router.post("/api/driver/create", createDriver);
router.put("/api/driver/update/:id", verifyFirebaseJWT, requireAdmin, updateDriver);
router.delete("/api/driver/delete/:id", verifyFirebaseJWT, requireAdmin, deleteDriver);
router.patch("/api/driver/update/:id/status", verifyFirebaseJWT, requireAdmin, updateDriverStatus);
router.get("/api/drivers/active", verifyFirebaseJWT, requireAdmin, getActiveDrivers);
router.get("/api/drivers/total/active", verifyFirebaseJWT, requireAdmin, getTotalActiveDrivers);
router.get("/api/drivers/total/status", verifyFirebaseJWT, requireAdmin, getDriversByStatus);
router.put('/api/driver/ban/:id', verifyFirebaseJWT, requireAdmin, driverBanned)
// Vehicles
router.get("/api/vehicle", verifyFirebaseJWT, requireAdmin, getAllVehicles);
router.get("/api/vehicleById/:id", verifyFirebaseJWT, requireAdmin, getVehicleById);
router.post("/api/vehicle/create", verifyFirebaseJWT, requireAdmin, createVehicle);
router.put("/api/vehicle/update/:id", verifyFirebaseJWT, requireAdmin, updateVehicle);
router.delete("/api/vehicle/delete/:id", verifyFirebaseJWT, requireAdmin, deleteVehicle);

// Total bookings
router.get("/api/totalBookings", verifyFirebaseJWT, requireAdmin, getTotalBookings);
router.get("/api/myBookings", getMyBookingsByEmail);
router.put("/api/myBookings/update/:id", updateBooking);
router.get("/all-bookings", verifyFirebaseJWT, getAllBookings);
router.get("/invoice", verifyFirebaseJWT, getInvoiceData);
router.delete("/api/booking/delete/:id", deleteBooking);
router.patch("/api/booking/update/status/:id", updateBookingByAdmin);
router.get('/api/bookingById/:id', getBookingById);
router.put("/api/booking/cancel/:id", cancelBooking)
// get total customer
router.get("/api/booking/total-customers", getTotalCustomers);

// pricing setting
router.get('/api/settings/pricing', verifyFirebaseJWT, requireAdmin, getPricingSettings)
router.put('/api/settings/pricing/update', verifyFirebaseJWT, requireAdmin, updatePricingSettings)


//admin side 
router.post("/bookings/assign", verifyFirebaseJWT, requireAdmin, assignTrip);
router.patch("/drivers/:driverId/assign-booking", updateDriverBookings);
router.get('/api/driver/assigned-rides/:driverId', getOwnAssingnedRides)
router.get('/api/driver/completed-rides/:driverId', getCompletedAssignedRides)
router.put("/api/driver/rides/:rideId/status", updateRideStatusByDriver)
router.get("/api/driver/latest-assigned-rides/:driverId", getLatestAssignedRides);
router.get("/api/driver/ride-details/:bookingId", getRideDetailsByBookingId);


router.get("/check/:email", checkDriverApplication);
router.put('/api/driver/reapply/:email', reapplyApplication)

router.get("/api/flights/:flightNumber",getFlightInfo);


module.exports = router;
