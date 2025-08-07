const { getDB } = require("../Config/db");

exports.getPricingConfig = async (req, res) => {
    try {
        const db = getDB();
        const config = await db.collection("pricing").findOne({});

        if (!config) {
            return res.status(404).json({ message: "Pricing config not found" });
        }

        res.status(200).json(config);
    } catch (error) {
        console.error("Error fetching pricing config:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
