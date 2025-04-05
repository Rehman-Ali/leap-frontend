"use client";

import Modal from "@/app/_components/connectionUrl-modal";
import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const DashboardVpsScreen = () => {
  const [orderList, setOrderList] = useState([]);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const totalPages = Math.ceil(orderList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = orderList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("u_t"));
    axios
      .get(SERVER_URL + "/api/order/user", {
        headers: {
          "x-auth-token": token
        }
      })
      .then((res) => {
        if (res.data && res.data.data) {
          let arr = res.data.data.filter((item) =>
            item.order_category.includes("vps")
          );
          setOrderList(arr);
        } else {
          console.error("Invalid response format", res);
        }
      })
      .catch((err) => console.error("Error fetching data", err));
  }, [isDelete]);

  

  const onClickDeleteButton = (id) => {
    setIsDelete(false);
    Swal.fire({
      title: "Do you really want to delete it. This will not reversable?",
      showDenyButton: true,
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes Delete",
      confirmButtonColor: "#37F94E",
      denyButtonText: `Cancel`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let token = JSON.parse(localStorage.getItem("u_t"));
        axios
          .put(
            SERVER_URL + `/api/order/update/${id}`,
            {
              status: "cancelled"
            },
            {
              headers: {
                "x-auth-token": token
              }
            }
          )
          .then((res) => {
            if (res.data.success === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your order has been deleted successfully",
                showConfirmButton: false,
                timer: 1500
              });
              setIsDelete(true);
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

  const copyToClipboardPublicId = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`Public Id copied successfully`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };



  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl flex items-center text-black dark:text-white">
            Your VPS
            <span className="bg-darkPrimary text-black dark:text-white text-sm px-2 py-0.5 h-fit ml-5 rounded-lg">
              {orderList.length}
            </span>
          </h1>
          <Link href="/buy-vps">
            <button className="flex justify-center dark:text-white items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black">
              Buy VPS
            </button>
          </Link>
        </div>
        <hr className="mt-4 mb-6" />
        <div>
          {paginatedData.length > 0 ? (
            <>
              <div className="overflow-x-auto w-full">
                <div className="min-w-[360px] ">
                  
                  <table className="w-full bg-white dark:bg-bodyColor rounded-lg shadow-md">
                    <thead>
                      <tr className="bg-darkPrimary text-black">
                        {/* <th className="py-2 border">Sr</th> */}
                        <th className="py-2 border">API Key</th>
                        <th className="py-2 border">Public ID</th>
                        {/* <th className="py-2  border">Duration</th> */}
                        <th className="py-2 border">Price ($)</th>
                        <th className="py-2 border">Price (SOL)</th>
                        <th className="py-2 border">Operating System</th>
                        <th className="py-2 border">Status</th>
                        <th className="py-2 border">Order Date</th>
                        <th className="py-2 border">Expiry Date</th>
                        <th className="py-2 border">Action</th>
                       

                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((order, index) => (
                        <tr key={index} className=" dark:text-white text-black">
                          {/* <td className="py-2 px-4 border-b text-center">
                            {index + 1}
                          </td> */}

                          <td className="py-2 px-4 border-b text-start">
                            {order.api_key}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <span
                              onClick={() => copyToClipboardPublicId(order._id)}
                              className="px-2 cursor-pointer py-1 bg-darkPrimary text-white text-[12px] rounded-md disabled:opacity-50"
                            >
                              Copy
                            </span>
                            {/* {order._id} */}
                          </td>
                          {/* <td className="py-2 px-4 border-b text-center">
                            {order.duration === 7
                              ? "1 week"
                              : order.duration / 30 + " month"}
                          </td> */}
                          <td className="py-2 px-4 border-b text-center">
                            $ {order.price.toFixed(2)}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {order.price_in_SOL} SOL
                          </td>
                          <td className="py-2 px-4 border-b capitalize text-center">
                            {order.operating_system === null
                              ? "N/A"
                              : order.operating_system}
                          </td>
                          <td className="py-2 px-4 border-b text-center capitalize">
                            <span
                              className={`px-2 cursor-pointer mr-[5px] py-1 ${
                                order.status === "active"
                                  ? "bg-darkPrimary text-black "
                                  : "bg-red-700 text-white"
                              }  text-[12px] rounded-md disabled:opacity-50`}
                            >
                              {order.status}
                            </span>
                            {order.isExpiryNear &&
                              order.status === "active" && (
                                <span className="px-2 cursor-pointer py-1 bg-yellow-500 text-white text-[12px] rounded-md disabled:opacity-50">
                                  Expiry
                                </span>
                              )}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {new Date(order.expiry_date).toLocaleDateString()}
                          </td>
                          <td className="py-2  px-4 border-b text-center">
                            {/* {(order.isExpiryNear ||
                                order.status === "inactive") && ( */}
                            <Link
                              href={`${
                                order.order_category === "vps"
                                  ? `/buy-vps?id=${order._id}`
                                  : `/buy?id=${order._id}`
                              }`}
                            >
                              <span
                                className="px-2 cursor-pointer mr-[10px] py-1 bg-darkPrimary text-black text-[12px] rounded-md disabled:opacity-50"
                                // onClick={() => onClickRenewButton()}
                              >
                                Renew
                              </span>
                            </Link>
                            {/* )} */}
                            <span
                              className="px-2 cursor-pointer py-1 bg-red-700 text-white text-[12px] rounded-md disabled:opacity-50"
                              onClick={() => onClickDeleteButton(order._id)}
                            >
                              Delete
                            </span>
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end items-center mt-4 gap-2">
                <button
                  className="px-3 py-1 text-black dark:text-white bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
            </>
          ) : (
            <div className="h-[80vh] w-full flex flex-col justify-center items-center text-center">
              <div className="text-2xl font-semibold text-gray-400 dark:text-white">
                You dont have any paid plans yet.
                <br />
                Get started by buying one and fly by the competition.
                <br />
                <br />
                {/* <span className="text-base">Want to test the waters first? </span> */}
              </div>
            </div>
          )}
         
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // transition={Bounce}
      />
    </div>
  );
};

export default DashboardVpsScreen;
