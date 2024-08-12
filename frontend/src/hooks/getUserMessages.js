import React, { useEffect, useState } from "react";
import useConversation from "../zustand/zustand";
import { useAuthContext } from "../context/AuthContext";

function getUserMessages() {
  const { selectedConversation, setMessages, messages } = useConversation();

  const { authUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const getAllMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/message/get-messages/${selectedConversation._id}`
      );
      const responseBody = await response.json();

      setMessages(responseBody);
      if (responseBody.success === false) {
        setLoading(false);
        throw new Error(responseBody.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) getAllMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading, getAllMessages };
}

export default getUserMessages;
