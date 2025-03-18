"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const AdminDashboardScreen = () => {
  const [orderList, setOrderList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [totalRevenue, setTotalRevenuce] = useState(0);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("u_t"));

    axios
      .get(SERVER_URL + "/api/order/all", {
        headers: {
          "x-auth-token": token
        }
      })
      .then(res => {
        setOrderList(res.data.data);
        let total = 0;
        for (var i = 0; i < res.data.data.length; i++) {
          total = total + res.data.data[i].price_in_SOL;
        }
        setTotalRevenuce(total);
      })
      .catch(err => console.log(err));

    axios
      .get(SERVER_URL + "/api/user/all", {
        headers: {
          "x-auth-token": token
        }
      })
      .then(res => {
        setUserList(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <div className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="relative flex flex-col items-center  rounded-lg border dark:border-gray-600 p-6 md:p-8 overflow-hidden w-full">
              <div className="bg-[#f8f8f7] dark:bg-gray-900 p-6 rounded-lg mt-6 w-full">
                <div className="flex flex-col w-full gap-5 text-nowrap">
                  <div className="grid grid-cols-3">
                    <div>
                      <div className="text-black dark:text-darkPrimary text-[24px] font-inter font-medium">
                        Total Users
                      </div>
                      <div className=" font-normal font-inter text-[24px] mt-4 text-black dark:text-white">
                        {userList.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/users"
                className="text-black cursor-pointer  dark:text-white text-xs self-end mt-4"
              >
                View More
              </Link>
            </div>
            <div className="relative flex flex-col items-center  rounded-lg border dark:border-gray-600 p-6 md:p-8 overflow-hidden w-full">
              <div className="bg-[#f8f8f7] dark:bg-gray-900 p-6 rounded-lg mt-6 w-full">
                <div className="flex flex-col w-full gap-5 text-nowrap">
                  <div className="grid grid-cols-3">
                    <div>
                      <div className="text-black dark:text-darkPrimary text-[24px] font-inter font-medium">
                        Total Orders
                      </div>
                      <div className=" font-normal text-black font-inter text-[24px] mt-4 dark:text-white">
                        {orderList.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/subscriptions"
                className="text-black cursor-pointer dark:text-white text-xs self-end mt-4"
              >
                View More
              </Link>
            </div>
            <div className="relative flex flex-col items-center  rounded-lg border dark:border-gray-600 p-6 md:p-8 overflow-hidden w-full">
              <div className="bg-[#f8f8f7] dark:bg-gray-900 p-6 rounded-lg mt-6 w-full">
                <div className="flex flex-col w-full gap-5 text-nowrap">
                  <div className="grid grid-cols-3">
                    <div>
                      <div className="text-black dark:text-darkPrimary text-[24px] font-inter font-medium">
                        Total Revenue
                        <span className="dark:text-white text-black text-[16px]">
                          &nbsp;(SOL)
                        </span>
                      </div>
                      <div className=" font-normal font-inter text-black text-[24px] mt-4 dark:text-white">
                        {totalRevenue.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
