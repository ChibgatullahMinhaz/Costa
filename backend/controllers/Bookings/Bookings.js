// controllers/bookingController.js
const { ObjectId } = require("mongodb");
const { getDB } = require("../../Config/db");

exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      date,
      time,
      paymentIntentId,
      amount,
      status = "paid",
    } = req.body;

    const db = req.app.locals.db;
    const bookingsCollection = db.collection("bookings");

    const booking = {
      userId: new ObjectId(userId),
      serviceId: new ObjectId(serviceId),
      date,
      time,
      amount,
      paymentIntentId: paymentIntentId || null,
      paymentStatus: status,
      createdAt: new Date(),
    };

    const result = await bookingsCollection.insertOne(booking);

    res.status(201).json({
      message: "Booking saved successfully.",
      bookingId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "Failed to save booking." });
  }
};


// GET /api/bookings/count - Get total count of bookings
exports.getTotalBookings = async (req, res) => {
  try {
    const db = getDB();
    const bookingsCollection = db.collection("Bookings"); // check name
    const count = await bookingsCollection.countDocuments();

    res.status(200).json({ totalBookings: count });
  } catch (error) {
    console.error("Error counting bookings:", error);
    res.status(500).json({ error: "Failed to count bookings" });
  }
};


// In your API route/controller
exports.getTotalCustomers = async (req, res) => {
  try {
    const db = getDB();
    const bookingsCollection = db.collection("Bookings");

    const uniqueCustomers = await bookingsCollection.distinct("user_email");
    res.status(200).json({ totalCustomers: uniqueCustomers.length });
  } catch (error) {
    console.error("Error fetching total customers:", error);
    res.status(500).json({ error: "Failed to fetch total customers" });
  }
};
