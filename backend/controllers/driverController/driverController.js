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
exports.updateDriverStatus = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { status, email } = req.body;

    if (!status || !email) {
      return res.status(400).json({ message: "Status and email are required" });
    }

    // Update driver application status
    const result = await db.collection("drivers").updateOne(
      { _id: new ObjectId(id) },
      { $set: { application_status: status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // If accepted, set role = driver in users collection
    if (status === "accepted") {
      await db.collection("users").updateOne(
        { email: email },
        { $set: { role: "driver", driverId: new ObjectId(id) } }
      );
    }

    res.json({ message: `Driver status updated to "${status}" successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update driver status" });
  }
}