const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// ✅ Scheduled notification every 10 seconds (for testing)
exports.testNotification = functions.pubsub
  .schedule("every 10 seconds")
  .onRun(async () => {
    const message = {
      topic: "all",
      notification: {
        title: "🧪 Test Notification",
        body: "This message is sent every 10 seconds for debugging.",
        icon: "icon-192.png",
      },
    };

    try {
      await admin.messaging().send(message);
      console.log("✅ Test notification sent to topic 'all'");
    } catch (error) {
      console.error("❌ Error sending test notification:", error);
    }

    return null; 
  });

// ✅ Manual test endpoint (still available)
exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const { title = "Manual Test", body = "Triggered from browser or curl" } = req.query;

  try {
    await admin.messaging().send({
      topic: "all",
      notification: { title, body },
    });
    console.log(`🚀 Sent manual notification: ${title}`);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending manual notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
