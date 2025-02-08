"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const OrderScreen = () => {
  const [orderList, setOrderList] = useState([]);

  const ITEMS_PER_PAGE = 5;

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
          "x-auth-token": token,
        },
      })
      .then((res) => {
        if (res.data && res.data.data) {
          setOrderList(res.data.data);
        } else {
          console.error("Invalid response format", res);
        }
      })
      .catch((err) => console.error("Error fetching data", err));
  }, [isDelete]);

  const onClickRenewButton = () => {
    // Your service start date from the database
    // const serviceStartDate = new Date("2025-01-29T07:29:00.390+00:00");
    // // Assuming the service lasts 30 days (adjust according to your actual duration)
    // const serviceDuration = 30; // in days
    // // Calculate the service end date
    // const serviceEndDate = new Date(serviceStartDate);
    // serviceEndDate.setDate(serviceEndDate.getDate() + serviceDuration);
    // // Set the reminder date (10 days before the service ends)
    // const reminderDate = new Date(serviceEndDate);
    // reminderDate.setDate(reminderDate.getDate() - 10);
    // // Get the current date
    // const currentDate = new Date();
    // // Check if today is the reminder date or later
    // if (currentDate >= reminderDate) {
    //   console.log("Your service package is going to end soon. Please renew before it expires.");
    // } else {
    //   console.log("Your service is still active.");
    // }
  };

  const onClickDeleteButton = (id) => {
    setIsDelete(false);
    Swal.fire({
      title: "Do you realy want to delete it. This will not reversable?",
      showDenyButton: true,
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes Delete",
      confirmButtonColor: "#37F94E",
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let token = JSON.parse(localStorage.getItem("u_t"));
        axios
          .put(
            SERVER_URL + `/api/order/update/${id}`,
            {
              status: "cancelled",
            },
            {
              headers: {
                "x-auth-token": token,
              },
            }
          )
          .then((res) => {
            if (res.data.success === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your order has been deleted successfully",
                showConfirmButton: false,
                timer: 1500,
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
              timer: 1500,
            })
          );
      }
    });
  };

  const getExpiryDate = (date) => {
    const serviceStartDate = new Date(date);

    // Assuming the service lasts 30 days (adjust according to your actual duration)
    const serviceDuration = 30; // in days

    // Calculate the service end date
    let serviceEndDate = new Date(serviceStartDate);
    serviceEndDate.setDate(serviceEndDate.getDate() + serviceDuration);

    // Return the calculated expiry date
    return serviceEndDate;
  };

  const getFormattedDate = (date) => {
    const serviceEndDate = new Date(date);
    const year = serviceEndDate.getFullYear();
    const month = (serviceEndDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = serviceEndDate.getDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
  };
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl flex items-center dark:text-white">
            Orders List
          </h1>
        </div>
        <hr className="mt-4 mb-6" />

        {paginatedData.length > 0 ? (
          <>
            <div className="overflow-x-auto mw-9:w-[300px]">
              <table className="min-w-full bg-white dark:bg-bodyColor   rounded-lg shadow-md">
                <thead>
                  <tr className="bg-darkPrimary text-black">
                    <th className="py-2 border">Sr</th>
                    <th className="py-2 border">Order Category</th>
                    <th className="py-2  border">Duration</th>
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
                      <td className="py-2 px-4 border-b text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b uppercase text-center">
                        {order.order_category}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {order.duration === 7
                          ? "1 week"
                          : order.duration / 30 + " month"}
                      </td>
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
                        <span className={`px-2 cursor-pointer mr-[5px] py-1 ${order.status === "active" ? "bg-darkPrimary text-black " : "bg-red-700 text-white" }  text-[12px] rounded-md disabled:opacity-50`}>
                          {order.status }
                        </span>
                        {order.isExpiryNear && order.status === "active" && (
                          <span
                            className="px-2 cursor-pointer py-1 bg-yellow-500 text-white text-[12px] rounded-md disabled:opacity-50"
                            onClick={() => onClickDeleteButton(order._id)}
                          >
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
                     { (order.isExpiryNear || order.status === 'inactive')  && 
                       <Link href={`${order.order_category === "vps" ? `/buy-vps?id=${order._id}` : `/buy?id=${order._id}`}`}>
                       <span
                          className="px-2 cursor-pointer mr-[10px] py-1 bg-darkPrimary text-black text-[12px] rounded-md disabled:opacity-50"
                          onClick={() => onClickRenewButton()}
                        >
                          Renew
                        </span>
                        </Link>
                      }
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
            <div className="flex justify-end items-center mt-4 gap-2">
              <button
                className="px-3 py-1 bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
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
                className="px-3 py-1 bg-gray-300 dark:bg-darkPrimary text-sm rounded-md disabled:opacity-50"
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
          <p className="dark:text-white text-black font-inter font-semibold text-center ">
            No Data Exist
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;
