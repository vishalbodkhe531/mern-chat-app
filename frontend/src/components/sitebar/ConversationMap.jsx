import React from "react";
import Conversation from "./Conversation";
import getAllUsers from "../../hooks/getAllUsers";
import { Link } from "react-router-dom";

function ConversationMap() {
  const { users, loading } = getAllUsers();
  return (
    <>
      <>
        <div className="py-2 flex flex-col overflow-auto w-[22rem] sm:h-[27rem] h-[39.20rem] scrollbar">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            users?.length !== 0 &&
            users.map((Item, idx) => (
                <Conversation
                  key={Item._id}
                  userData={Item}
                  lastIdx={idx === users.length - 1}
                />
              
            ))
          )}
        </div>
      </>
    </>
  );
}

export default ConversationMap;
