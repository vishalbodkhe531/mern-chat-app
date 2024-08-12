import { Conversation } from "../models/conversation.js";
import { Messages } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getAllRegisterUser = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const recieverId = req.params.id;
    const senderId = req.user._id;

    //find in conversation model
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    // //here check users has already tolking or not
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    // // message create in Message model
    const newMessage = new Messages({
      senderId,
      recieverId,
      messages: message,
    });

    if (newMessage) {
      conversation.messageIds.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getReceiverSocketId(recieverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params; // Extract receiverId from route parameters

    const senderId = req.user;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messageIds");

    // Check if the conversation is found
    if (!conversation) {
      if (!conversation) return res.status(200).json([]);
    }

    res.status(200).json(conversation.messageIds); // Respond with the messages
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
