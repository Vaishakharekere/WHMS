const OTSchedule = require("../models/OTSchedule");

function initOTSocket(io, socket) {
  console.log("OT Socket connected:", socket.id);

  // Staff updates surgery status
  socket.on("updateStatus", async ({ scheduleId, status }) => {
    try {
      const updatedSchedule = await OTSchedule.findByIdAndUpdate(
        scheduleId,
        { status },
        { new: true }
      ).populate("patientId doctorId");

      if (updatedSchedule) {
        // Broadcast update to all clients
        io.emit("otScheduleUpdated", {
          scheduleId,
          updatedFields: { status },
          schedule: updatedSchedule,
        });
      }
    } catch (error) {
      console.error("Error updating OT schedule status:", error);
    }
  });

  // Example: Staff can trigger an emergency alert
  socket.on("triggerEmergency", ({ code, message }) => {
    const alertData = {
      code,
      message,
      timestamp: new Date().toISOString(),
    };
    // Broadcast emergency alert to all clients
    io.emit("emergencyAlert", alertData);
  });

  // Optional: listen for alert acknowledgement
  socket.on("acknowledgeAlert", ({ alertId, userId }) => {
    console.log(`Alert ${alertId} acknowledged by user ${userId}`);
    // Optionally broadcast or store acknowledgement
  });

  socket.on("disconnect", () => {
    console.log("OT Socket disconnected:", socket.id);
  });
}

module.exports = { initOTSocket };
