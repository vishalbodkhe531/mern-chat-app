import { Server } from "socket.io";
import http from "http";

import express from "express";

const server = express();

const app = http.createServer(server);

const io = new Server(app, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // {userId : socketId}

io.on("connection", (socket) => {
  console.log(`user successfully connected to the socket`);

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`user disconnected : ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server };
