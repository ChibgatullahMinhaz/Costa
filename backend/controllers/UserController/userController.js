const { ObjectId } = require("mongodb");
const { getDB } = require("../Config/db");
require("dotenv").config();


// GET /users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET /users/:id
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// POST /users
export const createUser = async (req, res) => {
  const { name, email, phone, role } = req.body;
  const user = new User({ name, email, phone, role });
  await user.save();
  res.status(201).json(user);
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};

// PATCH /users/:id/status
export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const updated = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
};
