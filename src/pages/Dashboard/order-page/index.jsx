"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import { useState, useEffect } from "react";


const OrderScreen = () => {
  const [orderList, setOrderList] = useState([]);

  const ITEMS_PER_PAGE = 10;

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
      .get(SERVER_URL + "/api/invoice/user", {
        headers: {
          "x-auth-token": token
        }
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


  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl flex items-center text-black dark:text-white">
            Invoice List
          </h1>
        </div>
        <hr className="mt-4 mb-6" />

        {paginatedData.length > 0 ? (
          <>
            <div className="overflow-x-auto w-full">
              <div className="min-w-[360px] ">
                <table className="w-full bg-white dark:bg-bodyColor rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-darkPrimary text-black">
                      <th className="py-2 border">Sr</th>
                      <th className="py-2 border">Category</th>
                      <th className="py-2  border">Duration</th>
                      <th className="py-2 border">Price ($)</th>
                      <th className="py-2 border">Price (SOL)</th>
                      <th className="py-2 border">Operating System</th>
                      <th className="py-2 border">Created At</th>
                      
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
                        <td className="py-2 px-4 border-b text-center">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        {/* <td className="py-2 px-4 border-b text-center">
                          {new Date(order.expiry_date).toLocaleDateString()}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
