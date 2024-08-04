import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
// import { API } from "../main";

function useLogout() {
  const navigateUser = useNavigate();

  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const logoutUser = async () => {
    setLoading(true);

    const response = await fetch(`/api/user/logout-user`, {
      credentials: "include",
    });

    const responseBody = await response.json();

    if (responseBody.success) {
      setLoading(false);
      toast.success(responseBody.message);
      localStorage.setItem("chat-user", JSON.stringify(responseBody));
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      navigateUser("/sign-in");
      return;
    }

    if (!responseBody.success) {
      setLoading(false);
      return toast.error(responseBody.message);
    }
  };
  return { logoutUser, loading };
}

export default useLogout;
