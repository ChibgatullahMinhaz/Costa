const { getDB } = require("../../Config/db");

exports.checkDriverApplication = async (req, res) => {
    try {
        const { email } = req.params;
        const db = getDB()
        const existing = await db.collection('drivers').findOne({ email });

        if (!existing) {
            return res.json({ exists: false });
        }

        res.json(existing);
    } catch (err) {
        console.error("Error checking application:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.reapplyApplication = async (req, res) => {
  try {
    const db = getDB();
    const { email } = req.params;

    const result = await db.collection("drivers").updateOne(
      { email: email },
      { $set: { application_status: "pending" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Driver not found or already pending" });
    }

    res.json({ message: "Application status updated to pending" });
  } catch (error) {
    console.error("Reapply error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
