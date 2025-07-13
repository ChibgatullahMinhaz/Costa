const { getDB } = require("../../Config/db");

// GET pricing settings
exports.getPricingSettings = async (req, res) => {
  try {
    const db = getDB();
    const pricing = await db.collection('pricing').findOne({});

    if (!pricing) {
      return res.status(404).json({ message: 'Pricing settings not found' });
    }

    res.json(pricing); // send the whole document
  } catch (err) {
    console.error('❌ Error fetching pricing settings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePricingSettings = async (req, res) => {
  try {
    const db = getDB();
    const updatedDoc = { ...req.body };

    // Remove _id if it exists
    delete updatedDoc._id;

    const updated = await db.collection('pricing').findOneAndUpdate(
      {}, // no filter: just update the first (and only) doc
      { $set: updatedDoc },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error('❌ Error updating pricing settings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
