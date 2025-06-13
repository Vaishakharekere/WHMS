const Token = require("../models/Token");

function initTokenSocket(io, socket) {
  console.log("📡 Token socket initialized:", socket.id);

  // Join department room
  socket.on("joinDepartment", (departmentId) => {
    socket.join(departmentId);
    console.log(`Socket ${socket.id} joined room: ${departmentId}`);
  });

  // Create new token
  socket.on("createToken", async ({ tokenNumber, departmentId, patientId, priority }) => {
    try {
      const token = await Token.create({ tokenNumber, departmentId, patientId, priority });
      emitUpdatedQueue(io, departmentId);
    } catch (err) {
      console.error("❌ createToken error:", err);
      socket.emit("error", "Failed to create token");
    }
  });

  // Update token status (e.g., to 'in-consultation', 'completed')
  socket.on("updateTokenStatus", async ({ tokenId, status }) => {
    try {
      const token = await Token.findByIdAndUpdate(tokenId, { status }, { new: true });
      if (token) {
        emitUpdatedQueue(io, token.departmentId);
      }
    } catch (err) {
      console.error("❌ updateTokenStatus error:", err);
    }
  });

  // Reorder token manually (drag-drop or admin override)
  socket.on("reorderTokens", async ({ departmentId, orderedTokenIds }) => {
    try {
      for (let i = 0; i < orderedTokenIds.length; i++) {
        await Token.findByIdAndUpdate(orderedTokenIds[i], { tokenNumber: i + 1 });
      }
      emitUpdatedQueue(io, departmentId);
    } catch (err) {
      console.error("❌ reorderTokens error:", err);
    }
  });

  // Prioritize token (e.g., emergency case)
  socket.on("prioritizeToken", async ({ tokenId }) => {
    try {
      const token = await Token.findByIdAndUpdate(tokenId, { priority: "emergency" }, { new: true });
      emitUpdatedQueue(io, token.departmentId);
    } catch (err) {
      console.error("❌ prioritizeToken error:", err);
    }
  });
}

// 🔁 Helper function to broadcast updated queue to all clients in a department
async function emitUpdatedQueue(io, departmentId) {
  try {
    const queue = await Token.find({ departmentId, status: "waiting" })
      .sort({ priority: -1, tokenNumber: 1 }) // Emergency tokens first
      .populate("patientId", "name age")
      .populate("departmentId", "name");

    io.to(departmentId.toString()).emit("queueUpdated", queue);
  } catch (err) {
    console.error("❌ emitUpdatedQueue error:", err);
  }
}

module.exports = { initTokenSocket };
