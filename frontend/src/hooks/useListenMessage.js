import React, { useEffect } from "react";
import notification from "../assets/notification.mp3";
import useConversation from "../zustand/zustand";
import { useSocketContext } from "../context/SocketContext";

function useListenMessage() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
}

export default useListenMessage;
