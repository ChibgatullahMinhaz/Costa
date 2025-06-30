const { ObjectId } = require("mongodb");
const { getDB } = require("../../Config/db");
require("dotenv").config();

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /users/:id
exports.getUserById = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    const db = getDB();
    const { name, email, phone, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const result = await db.collection("users").insertOne({ name, email, phone, role });
    res.status(201).json({ _id: result.insertedId, name, email, phone, role });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ message: "User not found" });
    res.json(result.value);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /users/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: "after" }
    );

    if (!result.value) return res.status(404).json({ message: "User not found" });
    res.json(result.value);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
