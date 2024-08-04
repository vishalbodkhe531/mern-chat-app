import { config } from "dotenv";
import express from "express";
import { databaseConnection } from "./data/data.js";
import userRoutes from "./routes/user.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messages.routes.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
config({ path: "./config/.env" });
databaseConnection();

// server.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// const server = express();

server.use(cors());

server.use(cookieParser());
server.use(express.json());

server.use("/api/user", userRoutes);
server.use("/api/message", messageRoutes);

server.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
