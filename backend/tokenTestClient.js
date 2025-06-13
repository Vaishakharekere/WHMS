const { io } = require("socket.io-client");

// Connect to the server
const socket = io("http://localhost:5000");

const departmentId = "664f0000a0a000001234abcd"; // Replace with real MongoDB ObjectId
const patientId = "66500000a0a000009876dcba";    // Replace with real patient ID

socket.on("connect", () => {
  console.log("🟢 Connected to server with ID:", socket.id);

  // Step 1: Join the department room
  socket.emit("joinDepartment", departmentId);
  console.log(`➡️ Joined department: ${departmentId}`);

  // Step 2: Create a token for the patient
  socket.emit("createToken", {
    tokenNumber: 1,
    departmentId,
    patientId,
    priority: "normal", // or "emergency"
  });

  // Optional: Simulate status update after a delay
  setTimeout(() => {
    socket.emit("updateTokenStatus", {
      tokenId: "6650abcd12efabcd3456deff", // Replace with actual token ID from DB
      status: "in-consultation",
    });
  }, 5000);

  // Optional: Simulate emergency priority
  setTimeout(() => {
    socket.emit("prioritizeToken", {
      tokenId: "6650abcd12efabcd3456deff", // Replace with actual token ID
    });
  }, 8000);
});

// Step 3: Listen for queue updates
socket.on("queueUpdated", (queue) => {
  console.log("🔁 Token queue updated:");
  queue.forEach((t, i) => {
    console.log(`${i + 1}. ${t.tokenNumber} | ${t.patientId.name} | Priority: ${t.priority} | Status: ${t.status}`);
  });
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from server");
});

socket.on("error", (err) => {
  console.error("⚠️ Server Error:", err);
});
