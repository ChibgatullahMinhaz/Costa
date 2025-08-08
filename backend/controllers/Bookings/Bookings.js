// controllers/bookingController.js
const { ObjectId } = require("mongodb");
const { getDB } = require("../../Config/db");

exports.createBooking = async (req, res) => {
  try {
    const { allValues, result, email } = req.body;
    const db = getDB();
    const bookingsCollection = db.collection("Bookings");
    const paymentHistory = db.collection("paymentHistory");

    const booking = {
      ...allValues,
      ...result,
      useEmail: email,
      paymentStatus: "paid",
      createdAt: new Date(),
      bookingStatus: 'pending'
    };

    const bookingResult = await bookingsCollection.insertOne(booking);
    const history = {
      ...result
    }
    await paymentHistory.insertOne(history);

    res.status(201).json({
      message: "Booking saved successfully.",
      bookingId: bookingResult.insertedId,
    });
    console.log(bookingResult)
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

exports.getMyBookingsByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    console.log(email)
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const db = getDB();
    const bookingsCollection = db.collection("Bookings");

    const bookings = await bookingsCollection.find({ useEmail: email }).toArray();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const db = getDB();
    const bookingsCollection = db.collection("Bookings");
    const allBookings = await bookingsCollection.find().toArray();

    res.status(200).json(allBookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.deleteBooking = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("Bookings").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: "booking not found" });

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateBookingByAdmin = async (req, res) => {
  const { id } = req.params;
  const { bookingStatus } = req.body;
  const db = getDB();
  try {
    const bookingCollection =db.collection("Bookings");

    const result = await bookingCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { bookingStatus } },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(result.value);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


exports.updateBooking = async (req, res) => {
  const db = getDB();
  const bookingId = req.params.id;

  const updateData = req.body;

  try {
    const result = await db.collection('Bookings').findOneAndUpdate(
      { _id: new ObjectId(bookingId) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(result.value);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  const db = getDB();
  const bookingId = req.params.id;

  let objectId;
  try {
    objectId = new ObjectId(bookingId); // validate ObjectId
  } catch (err) {
    return res.status(400).json({ message: 'Invalid booking ID format' });
  }

  try {
    const booking = await db.collection('Bookings').findOne({ _id: objectId });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;

  if (!ObjectId.isValid(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const db = getDB()
    const bookingCollection = db.collection('Bookings')
    const result = await bookingCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { bookingStatus: "Cancelled" } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (result.modifiedCount === 1) {
      return res.json({ message: "Booking cancelled successfully" });
    } else {
      return res.status(500).json({ message: "Could not cancel booking" });
    }
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};