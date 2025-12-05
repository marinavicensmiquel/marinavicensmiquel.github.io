const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Manual trigger endpoint
exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const { title = "Benestar Reminder", body = "It’s time for your wellbeing check 🌿" } = req.query;
  try {
    await admin.messaging().send({
      topic: "all",
      notification: { title, body, icon: "icon-192.png" },
    });
    console.log(`🚀 Notification sent: ${title}`);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
