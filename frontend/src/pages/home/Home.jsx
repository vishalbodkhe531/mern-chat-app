import React from "react";
import SideBar from "../../components/sitebar/SideBar";
import MessageContainer from "../../components/messages/MessageContainer";

function Home() {
  return (
    <>
      <div className="h-screen w-full flex sm:justify-center mt-1 items-center">
        <div className="bg-white sm:p-3 p-1 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 sm:h-[450px] md:h-[590px] w-[25rem] flex flex-col">
          <SideBar />
        </div>
        <div
          className={`bg-white p-3 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 sm:h-[450px] md:h-[590px] w-[33rem] sm:flex hidden`}
        >
          <MessageContainer />
        </div>
      </div>
    </>
  );
}

export default Home;
