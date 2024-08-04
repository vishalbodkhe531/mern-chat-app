import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { API } from "../main";

const getAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const allUsers = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/message/all-registeruser`);

        const responseBody = await response.json();

        if (responseBody) {
          setLoading(false);
          setUsers(responseBody);
          toast.success(responseBody.message);
          return;
        }

        if (!responseBody.success) {
          setLoading(false);
          return toast.error(responseBody.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    };
    allUsers();
  }, []);

  return { users, loading };
};

export default getAllUsers;
