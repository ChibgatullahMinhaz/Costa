const { ObjectId } = require("mongodb");
const { getDB } = require("../../Config/db");

// GET /drivers
exports.getDrivers = async (req, res) => {
  try {
    const db = getDB();
    const drivers = await db.collection("drivers").find().toArray();
    res.json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /drivers/:id
exports.getDriverById = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID format" });

    const driver = await db.collection("drivers").findOne({ _id: new ObjectId(id) });
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    res.json(driver);
  } catch (error) {
    console.error("Error fetching driver by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /drivers
exports.createDriver = async (req, res) => {
  try {
    const db = getDB();
    const typeCollection = db.collection('carType')
    const newDriver = req.body;
    const finalData = {
      ...newDriver,
      application_status: "pending"
    }
    const result = await db.collection("drivers").insertOne(finalData);
    const vehicleData = {
      fullName: newDriver?.fullName,
      vehicleType: newDriver?.vehicleType,
      vehicleModel: newDriver?.vehicleModel,
      vehicleYear: newDriver?.vehicleYear,
      licensePlate: newDriver?.licenseNumber,
      vehicleColor: newDriver?.vehicleColor,
      seatCapacity: newDriver?.seatCapacity,
      luggageCapacity: newDriver?.luggageCapacity,
      status: 'active',
      title: newDriver?.title,
      subtitle: newDriver?.subtitle,
      imageUrl: newDriver?.imageUrl,
      price: newDriver?.price
    };


    const vehicleResult = await db.collection("cars").insertOne(vehicleData);
    console.log(vehicleResult)
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /drivers/:id
exports.updateDriver = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    console.log(id)

    // Remove _id if it's in the request body
    const updateData = { ...req.body };
    delete updateData._id;


    const result = await db.collection("drivers").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData });

    if (!result) return res.status(404).json({ message: "Driver not found" });
    res.send(result);
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /drivers/:id
exports.deleteDriver = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID format" });

    const result = await db.collection("drivers").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Driver not found" });

    res.json({ message: "Driver deleted" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /drivers/:id/status
exports.updateDriverStatus = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { status } = req.body;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID format" });

    const result = await db.collection("drivers").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ message: "Driver not found" });
    res.json(result.value);
  } catch (error) {
    console.error("Error updating driver status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// controllers/driverController.js

exports.getActiveDrivers = async (req, res) => {
  try {
    const db = getDB();

    const driversCollection = db.collection("drivers");
    const query = { application_status: { $in: ["active", "Active", "accepted"] } };
    const activeDrivers = await driversCollection.find(query).toArray();

    res.status(200).json(activeDrivers);
  } catch (error) {
    console.error("Error fetching active drivers:", error);
    res.status(500).json({ error: "Failed to fetch active drivers" });
  }
};


exports.getTotalActiveDrivers = async (req, res) => {
  try {
    const db = getDB();
    const driversCollection = db.collection("drivers");
    const query = { status: { $in: ["active", "Active"] } };

    const activeDriversCount = await driversCollection.countDocuments(query);

    res.status(200).json({ activeDriversCount });
  } catch (error) {
    console.error("Error fetching active drivers:", error);
    res.status(500).json({ error: "Failed to fetch active drivers" });
  }
};

// Get all drivers with a specific status (e.g., "pending")
exports.getDriversByStatus = async (req, res) => {
  const status = req.query.status;

  try {
    const db = getDB();
    const drivers = await db
      .collection('drivers')
      .find({ application_status: status })
      .toArray();

    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
};

// Update a driver's application status
exports.updateDriverStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const db = getDB();
    const result = await db
      .collection('drivers')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { application_status: status } }
      );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: `Driver status updated to ${status}` });
    } else {
      res.status(404).json({ error: 'Driver not found or already updated' });
    }
  } catch (error) {
    console.error('Error updating driver status:', error);
    res.status(500).json({ error: 'Failed to update driver status' });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  const db = req.app.locals.db;
  const driverId = req.params.id;
  const { status } = req.body;

  // Validate status - allow only certain statuses, adjust as needed
  const allowedStatuses = ['pending', 'accepted', 'rejected', 'banned', 'active'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  try {
    const result = await db.collection('drivers').updateOne(
      { _id: new ObjectId(driverId) },
      { $set: { application_status: status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Driver not found.' });
    }

    res.json({ message: `Application status updated to "${status}".` });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};