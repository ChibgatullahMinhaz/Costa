import Driver from "../models/Driver.js";

export const getDrivers = async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
};

export const getDriverById = async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  if (!driver) return res.status(404).json({ message: "Driver not found" });
  res.json(driver);
};

export const createDriver = async (req, res) => {
  const {
    name,
    phone,
    email,
    licenseNumber,
    vehicleType,
    vehicleNumber,
    location,
  } = req.body;

  const driver = new Driver({
    name,
    phone,
    email,
    licenseNumber,
    vehicleType,
    vehicleNumber,
    location,
  });

  await driver.save();
  res.status(201).json(driver);
};

export const updateDriver = async (req, res) => {
  const updated = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Driver not found" });
  res.json(updated);
};

export const deleteDriver = async (req, res) => {
  const deleted = await Driver.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Driver not found" });
  res.json({ message: "Driver deleted" });
};

export const updateDriverStatus = async (req, res) => {
  const { status } = req.body;
  const updated = await Driver.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: "Driver not found" });
  res.json(updated);
};
