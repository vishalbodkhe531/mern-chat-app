import { useState } from "react";
import { toast } from "react-toastify";
// import { API } from "../main";
import { useNavigate } from "react-router-dom";

const useSignUp = (formData) => {
  const [loading, setLoading] = useState(false);
  const navigateUser = useNavigate();

  const signUp = async (formData) => {
    setLoading(true);
    const response = await fetch(`/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (responseBody.success) {
      setLoading(false);
      toast.success(responseBody.message);
      navigateUser("/sign-in");
      return;
    }

    if (!responseBody.success) {
      setLoading(false);
      toast.error(responseBody.message);
    }
  };

  return { signUp, loading };
};

export default useSignUp;
