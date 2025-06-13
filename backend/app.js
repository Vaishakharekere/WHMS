const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

// Routes
const tokenRoutes = require("./routes/tokenRoutes");
const drugRoutes = require("./routes/drugRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const patientRoutes = require("./routes/patientRoutes");
const otScheduleRoutes = require("./routes/otScheduleRoutes");

// Socket handlers
const { initTokenSocket } = require("./socket/tokenSocket");
const { initDrugSocket } = require("./socket/drugSocket");
const { initOTSocket } = require("./socket/otSocket");

// Express + HTTP + Socket.IO
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/tokens", tokenRoutes);
app.use("/api/drugs", drugRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/ot-schedules", otScheduleRoutes);

// Socket.IO handling
const Token = require('./models/Token'); // Your token model

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  initTokenSocket(io, socket);
  initDrugSocket(io, socket);
  initOTSocket(io, socket);

  socket.on("joinDepartment", (departmentId) => {
    socket.join(departmentId);
  });

  // Create token with priority
  socket.on("createToken", async (data) => {
    try {
      const { tokenNumber, departmentId, patientId, priority = "normal" } = data;

      const newToken = new Token({
        tokenNumber,
        departmentId,
        patientId,
        status: "waiting",
        priority,
      });

      await newToken.save();

      // Get updated queue sorted by priority and tokenNumber (or createdAt)
      const queue = await Token.find({ departmentId, status: "waiting" })
        .sort({ priority: -1, tokenNumber: 1 })
        .lean();

      // Broadcast updated queue to department room
      io.to(departmentId).emit("queueUpdated", queue);
    } catch (err) {
      console.error(err);
      socket.emit("error", { message: "Failed to create token" });
    }
  });

  // Admin reorders queue (expects array of token IDs in new order)
  socket.on("reorderQueue", async ({ departmentId, orderedTokenIds }) => {
    try {
      // For simplicity, we update a 'queuePosition' field based on order
      // Ensure you add queuePosition in your model if you want to persist ordering

      for (let i = 0; i < orderedTokenIds.length; i++) {
        await Token.findByIdAndUpdate(orderedTokenIds[i], { queuePosition: i + 1 });
      }

      // Get updated queue sorted by queuePosition or fallback to priority/tokenNumber
      const queue = await Token.find({ departmentId, status: "waiting" })
        .sort({ queuePosition: 1, priority: -1, tokenNumber: 1 })
        .lean();

      io.to(departmentId).emit("queueUpdated", queue);
    } catch (err) {
      console.error(err);
      socket.emit("error", { message: "Failed to reorder queue" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// MongoDB connection and server start
async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/whms_db");
    console.log("✅ MongoDB connected");

    server.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Stop the app if DB fails
  }
}

startServer();
