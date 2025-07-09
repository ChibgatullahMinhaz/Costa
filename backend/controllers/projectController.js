const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");
const { getDB } = require("../Config/db");
require("dotenv").config();

// Server test
exports.getServer = (req, res) => {
  res.status(200).send("costa server is running");
};



exports.getRecentActivity = async (req, res) => {
  try {
    const db = getDB();
    const logs = await db.collection("ActivityLogs")
      .find({ userId: req.userId }) // বা role বা অন্য condition
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    res.status(200).json({ logs });
  } catch (error) {
    console.error("Activity fetch error:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};
