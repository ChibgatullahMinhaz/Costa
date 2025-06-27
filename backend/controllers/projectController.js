const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");
const { getDB } = require("../Config/db");
require("dotenv").config();

// Server test
exports.getServer = (req, res) => {
  res.status(200).send("Portfolio API is running");
};