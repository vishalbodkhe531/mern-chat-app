import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      // unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "/",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
