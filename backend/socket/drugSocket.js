function initDrugSocket(io, socket) {
  socket.on("drug-stock-update", (data) => {
    io.emit("drug-stock-refresh", data); // live update to clients
  });
}
module.exports = { initDrugSocket };
