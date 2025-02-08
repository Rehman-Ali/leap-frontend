"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import { useState, useEffect } from "react";

const UserScreen = () => {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Editor" },
    {
      id: 5,
      name: "Charlie Green",
      email: "charlie@example.com",
      role: "User",
    },
    { id: 6, name: "David White", email: "david@example.com", role: "Admin" },
    { id: 7, name: "Emma Black", email: "emma@example.com", role: "Editor" },
    { id: 8, name: "Frank Blue", email: "frank@example.com", role: "User" },
    { id: 9, name: "Grace Pink", email: "grace@example.com", role: "User" },
    { id: 10, name: "Henry Yellow", email: "henry@example.com", role: "Admin" },
  ];
  const [userList, setUserList] = useState([]);

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(userList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = userList.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  


  useEffect(() => {

    axios
      .get(SERVER_URL + "/api/user/all")
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="">
          <div className="">
            <h2 className="text-[26px] font-medium mb-8 text-white" >Users List</h2>
            <div className="overflow-x-auto mw-9:w-[300px]">
            <table className="min-w-full bg-white dark:bg-bodyColor   rounded-lg shadow-md">
              <thead>
                <tr className="bg-darkPrimary text-black">
                  <th className="py-2 border">ID</th>
                  <th className="py-2 border">Dynamic Platfrom ID</th>
                  <th className="py-2 border">Role</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((user, index) => (
                  <tr key={index} className=" dark:text-white text-black">
                    <td className="py-2 px-4 border-b">{user._id}</td>
                    <td className="py-2 px-4 border-b">{user.dp_user_id}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          
            </div>
            <div className="flex justify-end items-center mt-4 gap-2">
              <button
                className="px-3 py-1 bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm dark:text-white text-black
              ">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserScreen;
