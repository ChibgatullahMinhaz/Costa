import Vehicle from "../models/Vehicle.js";

export const getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
};

export const getVehicleById = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  res.json(vehicle);
};

export const createVehicle = async (req, res) => {
  const { type, baseFare, pricePerKm, capacity, imageUrl } = req.body;

  const vehicle = new Vehicle({ type, baseFare, pricePerKm, capacity, imageUrl });
  await vehicle.save();
  res.status(201).json(vehicle);
};

export const updateVehicle = async (req, res) => {
  const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Vehicle not found" });
  res.json(updated);
};

export const deleteVehicle = async (req, res) => {
  const deleted = await Vehicle.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Vehicle not found" });
  res.json({ message: "Vehicle deleted" });
};
