const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("✅ Connected to server with ID:", socket.id);

  // Emit your custom event
  socket.emit("testEvent", { message: "Hello server!" });
});

socket.on("testResponse", (data) => {
  console.log("📨 Response from server:", data);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from server");
});
