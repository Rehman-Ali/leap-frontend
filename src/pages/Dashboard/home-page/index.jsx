"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import FullPageLoader from "@/app/_components/loader";
import Modal from "@/app/_components/connectionUrl-modal";

const DashboardScreen = () => {
  const [isOrderNearExpiry, setOrderNearExpiry] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("u_t");
    if (!token) return;

    axios
      .get(`${SERVER_URL}/api/order/near-to-expire`, {
        headers: { "x-auth-token": JSON.parse(token) },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          setOrderNearExpiry(true);
        } else {
          setOrderNearExpiry(false);
        }
      })
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  const [orderList, setOrderList] = useState([]);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(
    () => Math.ceil(orderList.length / ITEMS_PER_PAGE),
    [orderList]
  );
  const paginatedData = useMemo(
    () =>
      orderList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [orderList, currentPage]
  );
  useEffect(() => {
    const token = localStorage.getItem("u_t");
    if (!token) return;

    axios
      .get(`${SERVER_URL}/api/order/user`, {
        headers: { "x-auth-token": JSON.parse(token) },
      })
      .then((res) => {
        if (res.data && res.data.data) {
          // Only update state if data is actually different
          setOrderList((prev) =>
            JSON.stringify(prev) !== JSON.stringify(res.data.data)
              ? res.data.data
              : prev
          );
        }
      })
      .catch((err) => console.error("Error fetching orders", err))
      .finally(() => setLoader(false));
  }, []);

  /// Modal of connection URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleOpenModal = (order) => {
    setIsModalOpen(true);
    setSelected(order);
  };

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        {isOrderNearExpiry ? (
          <p className="bg-red-700 text-white font-inter font-semibold p-2  rounded mb-[20px]">
            Your servers is near to expired please renew your subscription
            before it shutdown.&nbsp;
            <Link href="/node">
              <span className="text-[#37F94E] underline cursor-pointer">
                Click Here
              </span>
            </Link>
          </p>
        ) : null}
        {loader ? (
          <FullPageLoader />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="w-full rounded-lg border dark:border-gray-600 p-6 md:p-8">
              <h1 className="self-start font-bold text-lg text-bodyColor dark:text-white">
                Your Nodes & VPS
              </h1>
              <div className="text-gray-500   text-md dark:text-white">
                Active Nodes & VPS can be see here.
              </div>
              {paginatedData.length > 0 ? (
                <>
                  <div className="overflow-x-auto w-full mt-[20px]">
                    <div className="min-w-[360px] ">
                      <table className="w-full bg-white dark:bg-bodyColor rounded-lg shadow-md">
                        <thead>
                          <tr className="bg-darkPrimary text-black">
                            <th className="py-2 border">Sr</th>
                            <th className="py-2 border">Category</th>
                            <th className="py-2 border">API Key</th>
                            <th className="py-2  border">Duration</th>
                            <th className="py-2 border">Price ($)</th>
                            <th className="py-2 border">Price (SOL)</th>
                            <th className="py-2 border">Operating System</th>
                            <th className="py-2 border">Status</th>
                            <th className="py-2 border">Connection URL</th>
                            {/* <th className="py-2 border">Order Date</th>
                      <th className="py-2 border">Expiry Date</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedData.map((order, index) => (
                            <tr
                              key={index}
                              className=" dark:text-white text-black"
                            >
                              <td className="py-2 px-4 border-b text-center">
                                {index + 1}
                              </td>
                              <td className="py-2 px-4 border-b uppercase text-center">
                                {order.order_category}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                {order.api_key}
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
                                <span
                                  className={`px-2 cursor-pointer mr-[5px] py-1 ${
                                    order.status === "active"
                                      ? "bg-darkPrimary text-black "
                                      : "bg-red-700 text-white"
                                  }  text-[12px] rounded-md disabled:opacity-50`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-2 px-4 border-b text-center capitalize">
                                <span
                                  onClick={() => handleOpenModal(order)}
                                  className="px-2 cursor-pointer mr-[5px] py-1 bg-gray-300 text-black text-[12px] rounded-md disabled:opacity-50"
                                >
                                  Click Here
                                </span>
                              </td>
                              {/* <td className="py-2 px-4 border-b text-center">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
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
                <div className="h-full w-full flex flex-col justify-center items-center text-center border-2 border-dashed py-28 rounded-lg mt-6">
                  <h1 className="font-semibold text-gray-500 text-lg dark:text-white">
                    No Active Nodes & VPS Found
                  </h1>
                  <div className="flex flex-row gap-x-4 my-4">
                    <Link href="/buy">
                      <button className="flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black">
                        Buy Node
                      </button>
                    </Link>
                    <Link href="/buy-vps">
                      <button className="flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2 rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu bg-darkPrimary text-black">
                        Buy VPS
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {orderList.length > 0 && selected !== null && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p className="dark:text-white text-black font-inter font-bold pb-[5px]">
              Bot URLs
            </p>
            <p className="dark:text-white text-black font-inter font-medium pb-[5px]">
              HTTP:&nbsp;
              <a
                href={`https://${
                  selected.region.toLowerCase().includes("ams")
                    ? "ams"
                    : selected.region.toLowerCase().includes("va")
                    ? "va"
                    : "fr"
                }.leap-blockchain.com/?api_key=${selected.api_key}`}
                target="_blank"
                className="text-blue-500 underline font-inter "
              >
                https://
                {selected.region.toLowerCase().includes("ams")
                  ? "ams"
                  : selected.region.toLowerCase().includes("va")
                  ? "va"
                  : "fr"}
                .leap-blockchain.com/?api_key={selected.api_key}{" "}
              </a>
            </p>

            <p className="dark:text-white text-black font-inter font-medium pb-[5px]">
              WSS:&nbsp;
              <span className="font-normal">
                wss://
                {selected.region.toLowerCase().includes("ams")
                  ? "ams"
                  : selected.region.toLowerCase().includes("va")
                  ? "va"
                  : "fr"}
                .leap-blockchain.com/?api_key={selected.api_key}
              </span>{" "}
            </p>
            <p className="dark:text-white text-black font-inter font-bold pt-[15px] pb-[5px]">
              gRPC/Geyser URLs
            </p>
            <p>
              <a
                href={` https://${
                  selected.region.toLowerCase().includes("ams")
                    ? "ams"
                    : selected.region.toLowerCase().includes("va")
                    ? "va"
                    : "fr"
                }.leap-blockchain.com:1000/?api_key=${selected.api_key}`}
                target="_blank"
                className="text-blue-500 underline font-inter "
              >
                https://
                {selected.region.toLowerCase().includes("ams")
                  ? "ams"
                  : selected.region.toLowerCase().includes("va")
                  ? "va"
                  : "fr"}
                .leap-blockchain.com:1000/?api_key={selected.api_key}
              </a>
            </p>
            <p>
              <a
                href={`https://${
                  selected.region.toLowerCase().includes("ams")
                    ? "ams"
                    : selected.region.toLowerCase().includes("va")
                    ? "va"
                    : "fr"
                }.leap-blockchain.com/10443?api_key=${selected.api_key}`}
                target="_blank"
                className="text-blue-500 underline font-inter "
              >
                https://
                {selected.region.toLowerCase().includes("ams")
                  ? "ams"
                  : selected.region.toLowerCase().includes("va")
                  ? "va"
                  : "fr"}
                .leap-blockchain.com/10443?api_key={selected.api_key}
              </a>
            </p>
            <p className="dark:text-white text-black font-inter font-bold pt-[15px] pb-[5px]">
              Browser URL
            </p>
            <p className="dark:text-white text-black">
              <a
                href={`https://${
                  selected.region.toLowerCase().includes("ams")
                    ? "ams"
                    : selected.region.toLowerCase().includes("va")
                    ? "va"
                    : "fr"
                }.leap-blockchain.com/?api_key=${selected.api_key}`}
                target="_blank"
                className="text-blue-500 underline font-inter "
              >
                https://
                {selected.region.toLowerCase().includes("ams")
                  ? "ams"
                  : selected.region.toLowerCase().includes("va")
                  ? "va"
                  : "fr"}
                .leap-blockchain.com/?api_key={selected.api_key}
              </a>
            </p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
