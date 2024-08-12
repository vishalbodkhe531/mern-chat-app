import React, { useEffect, useRef } from "react";
import Message from "./Message";
import getUserMessages from "../../hooks/getUserMessages";
import useConversation from "../../zustand/zustand";
import Skeletones from "../skeletons/Skeletones";
import useListenMessage from "../../hooks/useListenMessage";

function Messages() {
  const { messages, loading } = getUserMessages();
  // const { loading } = getUserMessages();

  const lastMessageRef = useRef();

  // useListenMessage();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  // console.log(messages);
  return (
    <>
      <div className="px-4 flex-1 overflow-auto">
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div className="" ref={lastMessageRef} key={message._id}>
              <Message message={message} />
            </div>
          ))}
        {loading && [...Array(3)].map((_, idx) => <Skeletones key={idx} />)}
        {!loading && messages.length === 0 && (
          <p className=" flex items-center justify-center h-[25rem] text-white">
            Send a message to start the conversation
          </p>
        )}
      </div>
    </>
  );
}

export default Messages;
