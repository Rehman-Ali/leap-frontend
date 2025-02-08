"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import { useState, useEffect } from "react";

const SubscriptionScreen = () => {
  const [orderList, setOrderList] = useState([]);

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orderList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = orderList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("u_t"));
    axios
      .get(SERVER_URL + "/api/order/all", {
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
  }, []);

  const getExpiryDate = (date, duration) => {
    const serviceStartDate = new Date(date);
    console.log(duration, "duration=====");
    // Assuming the service lasts 30 days (adjust according to your actual duration)
    const serviceDuration = parseInt(duration.split(" ")[0]); // in days
    console.log(serviceDuration, "servive duration");

    // Calculate the service end date
    let serviceEndDate = new Date(serviceStartDate);
    serviceEndDate.setDate(serviceEndDate.getDate() + serviceDuration * 30);

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
        <h2 className="text-[26px] font-medium mb-8 text-white">
          Subscriptions List
        </h2>
        {paginatedData.length > 0 ? (
          <>
            <div className="overflow-x-auto mw-9:w-[300px]">
              <table className="min-w-full bg-white dark:bg-bodyColor   rounded-lg shadow-md">
                <thead>
                  <tr className="bg-darkPrimary text-black">
                    <th className="py-2 border">Sr</th>
                    <th className="py-2 border">User ID</th>
                    <th className="py-2  border">Duration</th>
                    <th className="py-2 border">Price ($)</th>
                    <th className="py-2 border">Price (SOL)</th>
                    <th className="py-2 border">Category</th>
                    <th className="py-2 border">Operating System</th>
                    <th className="py-2 border">Order Date</th>
                    <th className="py-2 border">Expiry Date</th>
                    <th className="py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((user, index) => (
                    <tr key={index} className=" dark:text-white text-black">
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{user.user_id}</td>
                      {user.duration === 7
                        ? "1 week"
                        : user.duration / 30 + " month"}
                      <td className="py-2 px-4 border-b">
                        ${user.price.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {user.price_in_SOL} SOL
                      </td>
                      <td className="py-2 px-4 border-b uppercase">
                        {user.order_category}
                      </td>
                      <td className="py-2 px-4 border-b capitalize">
                        {user.operating_system === null
                          ? "N/A"
                          : user.operating_system}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(user.expiry_date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="px-2 py-1 bg-red-700 text-white text-[12px] rounded-md disabled:opacity-50"
                          // onClick={() => onClickDeleteButton()}
                        >
                          Cancel
                        </button>
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

export default SubscriptionScreen;
