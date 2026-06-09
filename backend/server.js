const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb://anugrah:anugrah123@ac-j8edrv2-shard-00-00.ugg2kma.mongodb.net:27017,ac-j8edrv2-shard-00-01.ugg2kma.mongodb.net:27017,ac-j8edrv2-shard-00-02.ugg2kma.mongodb.net:27017/?ssl=true&replicaSet=atlas-dzcnk7-shard-0&authSource=admin&appName=FeedbackCluster"
)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err);
});
mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ Mongoose Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("❌ MongoDB Disconnected");
});

// Print connection state every 5 seconds

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

// Add Feedback
app.post("/addFeedback", async (req, res) => {
  console.log("Received:", req.body);

  try {
    const feedback = new Feedback(req.body);

    await feedback.save();

    console.log("✅ Saved Successfully");

    res.status(201).json({
      message: "Feedback Added"
    });

  } catch (error) {

    console.log("❌ SAVE ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
});

// Get All Feedbacks
app.get("/feedbacks", async (req, res) => {
  try {

    const feedbacks = await Feedback.find();

    res.json(feedbacks);

  } catch (error) {

    res.status(500).json(error);

  }
});

// Delete Feedback
app.delete("/feedback/:id", async (req, res) => {
  try {

    await Feedback.findByIdAndDelete(req.params.id);

    res.json({
      message: "Feedback Deleted"
    });

  } catch (error) {

    res.status(500).json(error);

  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});