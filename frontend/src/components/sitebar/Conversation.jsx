import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/zustand";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ userData, lastIdx, emoji }) {
  const { authUser } = useAuthContext();

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(userData._id);

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === userData._id;

  return (
    <>
      <div
        className={`flex  gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer mt-4 w-[20rem] ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(userData)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="rounded-full h-12">
            <img src={userData.profilePic} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 ml-4">{userData.name}</p>
            <span>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
