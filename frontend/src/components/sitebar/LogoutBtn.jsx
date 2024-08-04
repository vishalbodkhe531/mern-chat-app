import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

function LogoutBtn() {
  const { logoutUser, loading } = useLogout();

  const handleLogoutBtn = () => {
    logoutUser();
  };
  return (
    <>
      <div className="bg-black p-1 rounded-full">
        {loading ? (
          <span className="loading loading-spinner "></span>
        ) : (
          <BiLogOut
            className="w-6 h-6 cursor-pointer"
            onClick={handleLogoutBtn}
          />
        )}
      </div>
    </>
  );
}

export default LogoutBtn;
