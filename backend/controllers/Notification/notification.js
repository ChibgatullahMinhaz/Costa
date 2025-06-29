
const { ObjectId } = require("mongodb");

// Send Notification
exports.sendNotification = async (req, res) => {
  try {
    const { title, message, targetGroup } = req.body;

    if (!title || !message || !targetGroup) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newNotification = {
      title,
      message,
      targetGroup,
      sentAt: new Date(),
    };

    const result = await req.db
      .collection("notifications")
      .insertOne(newNotification);

    res.status(201).json({
      message: "Notification sent successfully.",
      data: result.ops?.[0] || newNotification, // For compatibility
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send notification", error });
  }
};

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
