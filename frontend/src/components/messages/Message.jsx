import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/zustand";

function Message(message) {
  const userData = message.message;

  const { selectedConversation } = useConversation();

  const { authUser } = useAuthContext();
  const fromMe = userData.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;

  return (
    <>
      <div className={`chat ${chatClassName} mt-3`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}>
          {userData.messages}
        </div>
        {/* <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div> */}
      </div>
    </>
  );
}

export default Message;
