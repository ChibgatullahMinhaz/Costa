const { ObjectId } = require("mongodb");
const { getDB } = require("../../Config/db");

// GET /vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const db = getDB();
    const vehicles = await db.collection("vehicles").find().toArray();
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /vehicles/:id
exports.getVehicleById = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID format" });

    const vehicle = await db.collection("vehicles").findOne({ _id: new ObjectId(id) });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    res.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /vehicles
exports.createVehicle = async (req, res) => {
  try {
    const db = getDB();
    const { type, baseFare, pricePerKm, capacity, imageUrl } = req.body;

    if (!type || !baseFare || !pricePerKm || !capacity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newVehicle = {
      type,
      baseFare,
      pricePerKm,
      capacity,
      imageUrl: imageUrl || "",
      createdAt: new Date()
    };

    const result = await db.collection("vehicles").insertOne(newVehicle);
    res.status(201).json({ _id: result.insertedId, ...newVehicle });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /vehicles/:id
exports.updateVehicle = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID format" });

    const result = await db.collection("vehicles").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ message: "Vehicle not found" });
    res.json(result.value);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /vehicles/:id
exports.deleteVehicle = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID format" });

    const result = await db.collection("vehicles").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Vehicle not found" });

    res.json({ message: "Vehicle deleted" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Get vehicles by type query param
exports.getVehiclesByType = async (req, res) => {
  try {
    const db = getDB();
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ message: "Type query parameter is required" });
    }

    const vehicles = await db.collection("cars").find({ type }).toArray();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to get vehicles", error });
  }
};


exports.getVehicleTypesWithPrices = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("carType").find().toArray();

    res.json(result); 
  } catch (error) {
    res.status(500).json({ message: "Failed to get vehicle types with prices", error });
  }
};
