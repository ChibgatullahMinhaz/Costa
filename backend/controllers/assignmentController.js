const { ObjectId } = require("mongodb");
const { getDB } = require("../Config/db");

async function assignTrip(req, res) {
    try {
        const db = getDB();
        const driverId = req.body.driverId.trim()
        const bookingId = req.body.bookingId.trim()
        const pickupLocation = req.body.pickupLocation.trim()
        const dropoffLocation = req.body.dropoffLocation.trim()
        const customerPhone = req.body.customerPhone.trim()
        const notes = req.body.notes.trim()

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
        await db.collection("assign-rids").insertOne(newAssignment);
        const result = await db.collection("Bookings").updateOne({ bookingID: bookingId },
            { $set: { bookingStatus: 'assigned' } }
        );
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






async function updateRideStatusByDriver(req, res) {
    const { rideId } = req.params;
    const { status } = req.body;
    console.log(req.body)

    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }
    const db = getDB();
    const assignCollection = await db.collection("assign-rids")
    const bookingsCollection = await db.collection("Bookings")

    try {

        // Update Bookings collection (bookingStatus)
        const updateBookingResult = await bookingsCollection.updateOne(
            { bookingID: rideId },
            { $set: { bookingStatus: status } }
        );

        // Update assign-rids collection (status)
        const updateAssignRidesResult = await assignCollection.updateOne(
            {
                bookingId: rideId
            },
            { $set: { status: status } }
        );

        if (
            updateBookingResult.matchedCount === 0 &&
            updateAssignRidesResult.matchedCount === 0
        ) {
            return res.status(404).json({ error: "Ride not found in both collections" });
        }

        res.json({ message: "Status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

async function getOwnAssingnedRides(req, res) {
    try {
        const db = getDB();

        const driverId = req.params.driverId;
        console.log(driverId)
        const rides = await db.collection("assign-rids")
            .find({ driverId: new ObjectId(driverId), status: { $ne: "completed" } }).sort({ _id: -1 })
            .toArray();

        res.json(rides);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch assigned rides" });
    }
};



async function getCompletedAssignedRides(req, res) {
    try {
        const db = getDB();
        const driverId = req.params.driverId;

        const rides = await db.collection("assign-rids")
            .find({
                driverId: new ObjectId(driverId),
                status: "completed"
            })
            .sort({ _id: -1 })
            .toArray();

        res.json(rides);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch completed rides" });
    }
};


async function getLatestAssignedRides(req, res) {
    try {
        const db = getDB();
        const driverId = req.params.driverId;

        const rides = await db.collection("assign-rids")
            .find({ driverId: new ObjectId(driverId), status: { $ne: "completed" } })
            .sort({ _id: -1 })
            .limit(2)
            .toArray();

        res.json(rides);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch latest rides" });
    }
}


async function getRideDetailsByBookingId(req, res) {
    try {
        const db = getDB();
        const { bookingId } = req.params;
        const trimBookId = bookingId.trim()
        

        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        // Find booking info from Bookings collection
        const bookingData = await db.collection("Bookings")
            .findOne({ bookingID: bookingId });

        // Find assigned ride info from assign-rids collection
        const assignedRideData = await db.collection("assign-rids")
            .findOne({ bookingId: bookingId });

        if (!bookingData && !assignedRideData) {
            return res.status(404).json({ message: "Ride not found" });
        }

        const rideDetails = {
            ...assignedRideData,
            ...bookingData
        };

        res.json(rideDetails);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch ride details" });
    }
}



module.exports = { assignTrip, updateDriverBookings, getOwnAssingnedRides, getCompletedAssignedRides, updateRideStatusByDriver, getLatestAssignedRides, getRideDetailsByBookingId };



