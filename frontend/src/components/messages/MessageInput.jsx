import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import sendMessage from "../../hooks/sendMessage";
import getUserMessages from "../../hooks/getUserMessages";
import { useRef } from "react";
import useListenMessage from "../../hooks/useListenMessage";

function MessageInput() {
  const { getAllMessages } = getUserMessages();
  const lastMessageRef = useRef();

  const [formData, setFormData] = useState("");
  const { userMesssage, loading } = sendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await userMesssage(formData);
    await getAllMessages();
    setFormData("");
  };

  useListenMessage();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center px-3 m-2 h-[2.50rem] items-center">
          <input
            type="text"
            className=" border text-sm rounded-lg block w-full p-2.5 outline-none border-gray-600 text-white"
            value={formData}
            placeholder="Send a message"
            onChange={(e) => setFormData(e.target.value)}
          />
          <button className="p-3 submit">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <div className="bg-black p-3 rounded-full">
                <BsSend />
              </div>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default MessageInput;
