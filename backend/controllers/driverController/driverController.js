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
    const {
      name,
      phone,
      email,
      licenseNumber,
      vehicleType,
      vehicleNumber,
      location,
    } = req.body;

    if (!name || !phone || !licenseNumber) {
      return res.status(400).json({ message: "Name, phone, and license number are required" });
    }

    const newDriver = {
      name,
      phone,
      email,
      licenseNumber,
      vehicleType,
      vehicleNumber,
      location,
      createdAt: new Date(),
    };

    const result = await db.collection("drivers").insertOne(newDriver);
    res.status(201).json({ _id: result.insertedId, ...newDriver });
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

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID format" });

    const result = await db.collection("drivers").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ message: "Driver not found" });
    res.json(result.value);
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
