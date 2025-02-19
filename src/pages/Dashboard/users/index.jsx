"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="dark:bg-black bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={onClose}
          >
            <span className="text-xl">×</span>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

const UserScreen = () => {
  const [userList, setUserList] = useState([]);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(userList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = userList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const [userToken, setUserToken] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [selectedRole, setSelectRole] = useState("user");
  const [selectedStatus, setSelectStatus] = useState("active");
  const [selectedUserId, setSelectUserId] = useState("");

  /// for modal open and close
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("u_t"));
    setUserToken(token);
    axios
      .get(SERVER_URL + "/api/user/all", {
        headers: {
          "x-auth-token": token
        }
      })
      .then((res) => {
        setUserList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [isUpdated]);

  const onDeleteUser = (id) => {
    setIsUpdated(false);
    Swal.fire({
      title: "Do you really want to delete it?",
      showDenyButton: true,
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes Delete",
      confirmButtonColor: "#37F94E",
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .put(
            SERVER_URL + `/api/user/update/${id}`,
            {
              status: "inactive"
            },
            {
              headers: {
                "x-auth-token": userToken
              }
            }
          )
          .then((res) => {
            if (res.data.success === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User status has been udpated successfully",
                showConfirmButton: false,
                timer: 1500
              });
              setIsUpdated(true);
            }
          })
          .catch((err) =>
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Server error. Please try again.",
              showConfirmButton: false,
              timer: 1500
            })
          );
      }
    });
  };

  const onUpdateUser = (e) => {
    e.preventDefault();
    setIsUpdated(false);
    Swal.fire({
      title: "Do you really want to update it?",
      showDenyButton: true,
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes Update",
      confirmButtonColor: "#37F94E",
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .put(
            SERVER_URL + `/api/user/update/${selectedUserId}`,
            {
              status: selectedStatus,
              role: selectedRole
            },
            {
              headers: {
                "x-auth-token": userToken
              }
            }
          )
          .then((res) => {
            if (res.data.success === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User status has been udpated successfully",
                showConfirmButton: false,
                timer: 1500
              });
              setIsUpdated(true);
              closeModal();
            }
          })
          .catch((err) =>
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Server error. Please try again.",
              showConfirmButton: false,
              timer: 1500
            })
          );
      }
    });
  };

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="">
          <div className="">
            <h2 className="text-[26px] font-medium mb-8 text-black dark:text-white">
              Users List
            </h2>
            <div className="overflow-x-auto mw-9:w-[300px]">
              <table className="min-w-full bg-white dark:bg-bodyColor   rounded-lg shadow-md">
                <thead>
                  <tr className="bg-darkPrimary text-black">
                    <th className="py-2 border">ID</th>
                    <th className="py-2 border">Dynamic Platfrom ID</th>
                    <th className="py-2 border">Role</th>
                    <th className="py-2 border">Status</th>
                    <th className="py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((user, index) => (
                    <tr key={index} className=" dark:text-white text-black">
                      <td className="py-2 px-4 border-b text-center">
                        {user._id}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {user.dp_user_id}
                      </td>
                      <td className="py-2 px-4 border-b text-center capitalize">
                        {user.role}
                      </td>
                      <td className="py-2 px-4 border-b text-center capitalize">
                        {user.status}
                      </td>
                      <td className="py-2  px-4 border-b text-center">
                        <span
                          className="px-2 cursor-pointer mr-[10px] py-1 bg-darkPrimary text-black text-[12px] rounded-md disabled:opacity-50"
                          onClick={() => {
                            openModal();
                            setSelectUserId(user._id);
                          }}
                        >
                          Update
                        </span>
                        <span
                          className="px-2 cursor-pointer py-1 bg-red-700 text-white text-[12px] rounded-md disabled:opacity-50"
                          onClick={() => onDeleteUser(user._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end items-center mt-4 gap-2">
              <button
                className="px-3 py-1 text-black dark:text-white bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span
                className="text-sm dark:text-white text-black
              "
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 text-black dark:text-white bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
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
      {/* modal code */}
      <div className="min-h-screen flex justify-center items-center">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-semibold mb-4 font-inter text-black dark:text-white ">
            Update User Detail
          </h2>
          <div className="flex flex-col">
            <div className="flex flex-col w-[100%]">
              <label className="dark:text-white text-black font-inter font-medium mb-2">
                User Status
              </label>
              <select
                defaultValue={"active"}
                onChange={(e) => setSelectStatus(e.target.value)}
                className="h-[50px] border dark:text-white text-black border-gray-600 rounded-[12px] pl-3"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex flex-col mt-[20px] w-[100%]">
              <label className="dark:text-white text-black font-inter font-medium mb-2">
                Role
              </label>
              <select
                defaultValue={"user"}
                onChange={(e) => setSelectRole(e.target.value)}
                className="h-[50px] border dark:text-white text-black border-gray-600 rounded-[12px] pl-3"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex flex-row gap-5 justify-end">
              <button
                onClick={(e) => onUpdateUser(e)}
                className="flex cursor-pointer justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black mt-4 xl:mt-6"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                className="flex cursor-pointer justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-gray-200 text-black mt-4 xl:mt-6"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            onClick={closeModal}
          >
            Close
          </button> */}
        </Modal>
      </div>
    </div>
  );
};

export default UserScreen;
