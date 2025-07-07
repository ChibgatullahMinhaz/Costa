// controllers/bookingController.js
const { ObjectId } = require("mongodb");

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
