import express from "express";
import {
  getAllRegisterUser,
  getMessages,
  sendMessage,
} from "../controllers/messages.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const messageRoute = express.Router();

messageRoute.get("/all-registeruser", isAuthenticated, getAllRegisterUser);
messageRoute.post("/send-message/:id", isAuthenticated, sendMessage);
messageRoute.get("/get-messages/:id", isAuthenticated, getMessages);
// messageRoute.post("/get-messages/:id", getMessages);

export default messageRoute;
