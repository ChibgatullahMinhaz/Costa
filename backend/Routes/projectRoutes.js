const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser, updateStatus } = require('../controllers/UserController/userController');
const { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver, updateDriverStatus } = require('../controllers/driverController/driverController');
const { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController/vehicleController');
const { sendNotification, getAllNotifications } = require('../controllers/Notification/notification');
const { getServer } = require('../controllers/projectController');
const router = express.Router();


// user management routes => Admin
router.get("/", getServer);
router.get("/api/user", getUsers);
router.get("/api/userById:id", getUserById);
router.post("/api/user/create", createUser);
router.put("/api/user/update:id", updateUser);
router.delete("/api/user/delete:id", deleteUser);
router.patch("/api/user/update:id/status", updateStatus);

// // driver management routes => Admin

// Drivers
router.get("/api/driver", getDrivers);
router.get("/api/driverById/:id", getDriverById);
router.post("/api/driver/create", createDriver);
router.put("/api/driver/update/:id", updateDriver);
router.delete("/api/driver/delete/:id", deleteDriver);
router.patch("/api/driver/update/:id/status", updateDriverStatus);


// Vehicles
router.get("/api/vehicle", getAllVehicles);
router.get("/api/vehicleById/:id", getVehicleById);
router.post("/api/vehicle/create", createVehicle);
router.put("/api/vehicle/update/:id", updateVehicle);
router.delete("/api/vehicle/delete/:id", deleteVehicle);

// Notifications
router.post("/api/notification/send", sendNotification);
router.get("/api/notification", getAllNotifications);

module.exports = router;
