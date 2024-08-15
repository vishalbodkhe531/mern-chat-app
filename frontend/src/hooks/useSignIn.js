import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
// import { API } from "../main";

const useSignIn = () => {
  const navigateUser = useNavigate();

  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
  const signIn = async (formData) => {
    setLoading(true);

    const formValidation = handleInputError(formData);
    if (!formValidation) return;

    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (responseBody.name) {
      setLoading(false);
      toast.success(`welcome ${responseBody.name}`);
      localStorage.setItem("chat-user", JSON.stringify(responseBody));
      setAuthUser(responseBody);
      navigateUser("/");
      return;
    }

    if (!response.ok) {
      setLoading(false);
      return toast.error(responseBody.message);
    }
  };
  return { signIn, loading };
};

function handleInputError(formData) {
  console.log(formData);
  const { userName, password } = formData;

  if (!userName.trim() || !password.trim() === "") {
    toast.error("Please fill all the field");
    setLoading(false);
    return false;
  }

  return true;
}

export default useSignIn;
