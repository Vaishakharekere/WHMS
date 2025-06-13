const { io } = require("socket.io-client");
const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected with id:", socket.id);

  // Example: send status update for a surgery
  socket.emit("updateStatus", { scheduleId: "SOME_SCHEDULE_ID", status: "ongoing" });

  // Example: trigger emergency alert
  socket.emit("triggerEmergency", { code: "Code Blue", message: "Patient in critical condition!" });
});

socket.on("otScheduleUpdated", (data) => {
  console.log("OT Schedule Updated:", data);
});

socket.on("emergencyAlert", (alert) => {
  console.log("Emergency Alert:", alert);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
