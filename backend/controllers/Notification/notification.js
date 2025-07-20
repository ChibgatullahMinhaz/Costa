
const { ObjectId } = require("mongodb");
const { getDB } = require("../../Config/db");
const admin = require("../../Firebase/firebaseAdmin.js")

// Get All Notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await req.db
      .collection("notifications")
      .find()
      .sort({ sentAt: -1 })
      .toArray();

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
};




exports.getUserToken = async (req, res) => {
  const group = req.query.group;
  const db = getDB();

  let filter = {};

  if (group === 'clients') filter = { role: 'user' };
  else if (group === 'drivers') filter = { role: 'driver' };
  try {
    const users = await db.collection('users').find(filter).project({ fcmToken: 1, _id: 0 }).toArray();
    const tokens = users.map(u => u.fcmToken).filter(Boolean);
    res.json({ tokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tokens' });
  }
};


// ২. send notification API
exports.sendNotification = async (req, res) => {
  const { tokens, title, message } = req.body;
  if (!tokens || tokens.length === 0) {
    return res.status(400).json({ message: 'No tokens provided' });
  }
  if (!title || !message) {
    return res.status(400).json({ message: 'Title and message are required' });
  }

  const payloads = tokens.map(token => ({
    token,
    notification: {
      title,
      body: message,
    },
  }));
  try {
    const results = await Promise.allSettled(
      payloads.map(msg => admin.messaging().send(msg))
    );

    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const failureCount = results.length - successCount;

    res.json({
      successCount,
      failureCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send notifications', error });
  }
};