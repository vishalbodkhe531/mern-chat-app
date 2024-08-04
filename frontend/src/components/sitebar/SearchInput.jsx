import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/zustand";
import getAllUsers from "../../hooks/getAllUsers";
import { toast } from "react-toastify";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { users } = getAllUsers();

  const { setSelectedConversation } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(search);

    if (!search) return;
    const searchUsers = users.filter(
      (user, idx, arr) =>
        user.name.toLocaleLowerCase() === search.toLocaleLowerCase()
    );
    if (searchUsers) {
      setSelectedConversation(searchUsers[0]);
      setSearch("");
    } else {
      toast.error("no such user found !!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 text-white"
      >
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </>
  );
}

export default SearchInput;
