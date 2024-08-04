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
          <div className="flex flex-wrap ">
            <div className="md:min-w-[490px] flex flex-col text-lg mt-4">
              <div className="">
                <span className="">To:</span>
                <span className="font-semibold text-white ml-3 text-lg">
                  {selectedConversation.name}
                </span>
              </div>
              <div className="sm:h-[17rem] md:h-[27rem] overflow-auto px-3 w-full">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <Messages />
                )}
              </div>
            </div>
            <div className="w-full">
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
