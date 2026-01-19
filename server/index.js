// index.js
// Express + Socket.io server for Zoom clone

const express = require("express"); // Express framework
const http = require("http"); // Node HTTP server
const { Server } = require("socket.io"); // Socket.io
const cors = require("cors"); // CORS

const app = express(); // Create Express app
app.use(cors()); // Enable CORS for all origins

// Create HTTP server using Express app
const server = http.createServer(app);

// Attach Socket.io to HTTP server (correct way)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Rooms object to track users
const rooms = {};

// Listen for socket connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join-room", ({ roomId, userId }) => {
    console.log(`User ${userId} joined room ${roomId}`);

    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push({ socketId: socket.id, userId });

    socket.join(roomId);

    socket.to(roomId).emit("user-connected", { userId, socketId: socket.id });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter((u) => u.socketId !== socket.id);
        socket.to(roomId).emit("user-disconnected", { userId, socketId: socket.id });
      }
    });
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
