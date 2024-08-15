import React, { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/zustand";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import sendMessage from "../../hooks/sendMessage";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { loading } = sendMessage();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>
      {!selectedConversation ? (
        <div className="w-full">
          <NoChatSelected />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-wrap">
            <div className="flex flex-col text-lg mt-4 w-full md:min-w-[490px]">
              <div className="mb-2">
                <span className="">To:</span>
                <span className="font-semibold text-white ml-3 text-lg">
                  {selectedConversation.name}
                </span>
              </div>
              <div className="sm:h-[17rem] md:h-[27rem] overflow-auto px-3 w-full">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner"></span>
                  </div>
                ) : (
                  <Messages />
                )}
              </div>
            </div>
            <div className="w-full mt-3">
              <MessageInput />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.name}❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
