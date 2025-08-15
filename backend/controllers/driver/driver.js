import { getDB } from "../../Config/db";

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