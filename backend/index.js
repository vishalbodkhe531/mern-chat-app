// import { config } from "dotenv";
import express from "express";
import { databaseConnection } from "./data/data.js";
import userRoutes from "./routes/user.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messages.routes.js";
import cors from "cors";
import path from "path";
import { app, server } from "./socket/socket.js";
import "dotenv/config";
databaseConnection();

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// const server = express();

server.use(cors());

const __dirname = path.resolve();

server.use(cookieParser());
server.use(express.json());

server.use("/api/user", userRoutes);
server.use("/api/message", messageRoutes);

server.use(errorMiddleware);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));
server.use(express.static(path.join(__dirname, "/frontend/dist")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
