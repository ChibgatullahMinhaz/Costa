const express = require('express');
const { getUsers, getUserById, createUser, updateUser, deleteUser, updateStatus } = require('../controllers/UserController/userController');
const { getDrivers, getDriverById, createDriver, updateDriver, deleteDriver, updateDriverStatus } = require('../controllers/driverController/driverController');
const { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicleController/vehicleController');
const { sendNotification, getAllNotifications } = require('../controllers/Notification/notification');
const router = express.Router();


// user management routes => Admin
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/status", updateStatus);

// driver management routes => Admin
router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);
router.patch("/:id/status", updateDriverStatus);

// ✅ Price & Vehicle Management
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.post("/", createVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

// notification

router.post("/", sendNotification); // POST /api/notifications
router.get("/", getAllNotifications); // GET /api/notifications


module.exports = router;
