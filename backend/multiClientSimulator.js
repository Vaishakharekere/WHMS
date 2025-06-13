const { io } = require("socket.io-client");

const SERVER_URL = "http://localhost:5000";
const DEPARTMENT_ID = "664f0000a0a000001234abcd"; // Replace with your department ID

// Sample patients data
const patients = [
  { patientId: "66500000a0a000009876dcba", name: "Alice" },
  { patientId: "66500000a0a000009876dcbb", name: "Bob" },
  { patientId: "66500000a0a000009876dcbc", name: "Charlie" },
];

// Connect as multiple patients
function createPatientClient(patient, tokenNumber) {
  const socket = io(SERVER_URL);

  socket.on("connect", () => {
    console.log(`Patient ${patient.name} connected: ${socket.id}`);

    // Join department room
    socket.emit("joinDepartment", DEPARTMENT_ID);

    // Create token after connection
    socket.emit("createToken", {
      tokenNumber,
      departmentId: DEPARTMENT_ID,
      patientId: patient.patientId,
      priority: "normal",
    });
  });

  socket.on("queueUpdated", (queue) => {
    console.log(`Queue update for Patient ${patient.name}:`, queue);
  });

  socket.on("disconnect", () => {
    console.log(`Patient ${patient.name} disconnected`);
  });
}

// Connect as department admin to listen for all updates
function createAdminClient() {
  const socket = io(SERVER_URL);

  socket.on("connect", () => {
    console.log(`Department Admin connected: ${socket.id}`);

    // Admin joins department room to monitor tokens
    socket.emit("joinDepartment", DEPARTMENT_ID);
  });

  socket.on("queueUpdated", (queue) => {
    console.log("🛎️ Admin sees updated token queue:", queue);
  });

  socket.on("disconnect", () => {
    console.log("Admin disconnected");
  });
}

// Simulate patients
patients.forEach((patient, index) => {
  createPatientClient(patient, index + 1);
});

// Simulate admin
createAdminClient();
