import { useState } from "react";
import { toast } from "react-toastify";
// import { API } from "../main";
import { useNavigate } from "react-router-dom";

const useSignUp = (formData) => {
  const [loading, setLoading] = useState(false);
  const navigateUser = useNavigate();

  const signUp = async (formData) => {
    const success = handleInputError(formData);
    if (!success) return;
    // console.log(formData);

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

function handleInputError(formData) {
  const { userName, password, confirmPassword, gender, name } = formData;

  if (
    !userName.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    !name.trim() ||
    !gender.trim() === ""
  ) {
    toast.error("Please fill all the field");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 character");
    return false;
  }

  return true;
}

export default useSignUp;
