import React from "react";
import SideBar from "../../components/sitebar/SideBar";
import MessageContainer from "../../components/messages/MessageContainer";

function Home() {
  return (
    <>
      <div className="h-screen w-full flex flex-col sm:flex-row sm:justify-center mt-1 items-center">
        <div className="bg-white p-3 sm:mr-3 mb-3 sm:mb-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 h-auto sm:h-[450px] md:h-[590px] w-full sm:w-[25rem] flex flex-col">
          <SideBar />
        </div>
        <div className="bg-white p-3 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 h-auto sm:h-[450px] md:h-[590px] w-full sm:w-[33rem] sm:flex">
          <MessageContainer />
        </div>
      </div>
    </>
  );
}

export default Home;
