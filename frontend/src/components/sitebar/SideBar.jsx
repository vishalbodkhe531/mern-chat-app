import React from "react";
import SearchInput from "../sitebar/SearchInput";
import ConversationMap from "../sitebar/ConversationMap";
import LogoutBtn from "../sitebar/LogoutBtn";

function SideBar() {
  return (
    <>
      <div className="sm:w-[20rem] w-[22rem] border-slate-500 flex flex-col relative">
        <div className="flex justify-center sm:w-[23rem] w-full">
          <SearchInput />
        </div>
        <div className="divider px-3"></div>
        <div className="">
          <ConversationMap />
        </div>
      </div>
      <div className="sm:mt-2 absolute bottom-2 left-0">
        <LogoutBtn />
      </div>
    </>
  );
}

export default SideBar;
