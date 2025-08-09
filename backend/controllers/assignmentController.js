const { ObjectId } = require("mongodb");
const { getDB } = require("../Config/db");

async function assignTrip(req, res) {
    try {
        const db = getDB();
        const {
            driverId,
            bookingId,
            pickupLocation,
            dropoffLocation,
            customerPhone,
            notes,
        } = req.body;

        if (!driverId || !bookingId) {
            return res.status(400).json({ message: "Driver ID and Booking ID required" });
        }

        // Check if bookingId already assigned
        const existingAssignment = await db.collection("assign-rids").findOne({ bookingId });
        if (existingAssignment) {
            return res.status(409).json({ message: "This booking is already assigned" });
        }

        // Create new booking assignment document
        const newAssignment = {
            driverId: new ObjectId(driverId),
            bookingId,
            pickupLocation,
            dropoffLocation,
            customerPhone,
            notes,
            assignedAt: new Date(),
            status: "assigned",
        };

        // Insert booking assignment
        const result = await db.collection("assign-rids").insertOne(newAssignment);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to assign trip" });
    }
}


async function updateDriverBookings(req, res) {
    try {
        const db = getDB();
        const { driverId } = req.params;
        const { bookingId } = req.body;

        if (!driverId || !bookingId) {
            return res.status(400).json({ message: "Driver ID and Booking ID required" });
        }

        // Update driver document: push bookingId into assignedBookings array
        const result = await db.collection("drivers").updateOne(
            { _id: new ObjectId(driverId) },
            { $addToSet: { assignedBookings: bookingId } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Driver not found or booking already assigned" });
        }

        res.json({ message: "Driver updated with assigned booking" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update driver bookings" });
    }
}

module.exports = { assignTrip, updateDriverBookings };
