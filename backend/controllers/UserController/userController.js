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

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.query?.email?.toLowerCase();
    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required" });
    }

    const db = getDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
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
// POST /users
exports.createUser = async (req, res) => {
  try {
    const db = getDB();
    const user = req.body;
    const { name, role } = user;
    const email = user?.email?.toLowerCase();
    const userDoc = {
      ...user,
      status: "active",
      deleted: false,
    }
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    if (role !== 'user' && role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }
    const activityLogs = {
      ...user,
      action: "user_Registration",
      metadata: {
        email: user.email,
        login_time: new Date(),

      },

      timestamp: new Date(),
      description: `User ${user.email} Registered in`
    }

    // If not, save the user
    const result = await db.collection("users").insertOne(userDoc);
    const logs = await db.collection('activityLogs').insertOne(activityLogs)
    res.status(201).json(result);

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
    const filter = { _id: new ObjectId(id) }
    const updateData = { ...req.body };
    if (updateData._id) delete updateData._id;
    const updatedDoc = { $set: updateData };
    const result = await db.collection("users").updateOne(filter, updatedDoc);
    if (!result) return res.status(404).json({ message: "User not found" });
    res.json(result);
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


exports.userBanned = async (req, res) => {
  const db = getDB();
  const userId = req.params.id;
  const { status } = req.body;

  try {
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          status: status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or already banned' });
    }

    res.status(200).json({ message: 'User has been banned successfully' });
  } catch (error) {
    console.error('Ban error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.driverBanned = async (req, res) => {
  const db = getDB();
  const userId = req.params.id;
  const { status } = req.body;

  try {
    const result = await db.collection('drivers').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          application_status: status,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or already banned' });
    }

    res.status(200).json({ message: 'User has been banned successfully' });
  } catch (error) {
    console.error('Ban error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


