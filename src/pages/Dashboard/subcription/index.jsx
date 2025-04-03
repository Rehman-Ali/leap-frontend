"use client";

import { SERVER_URL } from "@/utils/server";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "@/app/_components/connectionUrl-modal";
const SubscriptionScreen = () => {
  const [orderList, setOrderList] = useState([]);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

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
  }, [isDelete, isUpdated]);

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

  /// Modal of connection URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectType, setSelectType] = useState("");
  const [selectDays, setSelectDays] = useState(0);
  const handleOpenModal = (order) => {
    setIsModalOpen(true);
    setSelected(order);
  };

  const onUpdateExpiry = async () => {
    try {
      setIsUpdated(false)
      let body = {
        duration: selectDays,
        actionType: selectType
      };
      let token = JSON.parse(localStorage.getItem("u_t"));
      await axios.put(`${SERVER_URL}/api/order/extend-reduce/${selected._id}`, body, {
        headers: {
          "x-auth-token": token
        }
      });
      setIsUpdated(true)
      setIsModalOpen(false);
      setSelectDays(0);
      setSelectType("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: `This order has been ${selectType} successfully`,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error during update order ${
          error.response?.data || error.message
        }`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <h2 className="text-[26px] font-medium mb-8 text-black dark:text-white">
          Subscriptions List
        </h2>
        {paginatedData.length > 0 ? (
          <>
            <div className="overflow-x-auto w-full">
              <div className="min-w-[360px]">
                <table className="w-full bg-white dark:bg-bodyColor rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-darkPrimary text-black">
                      <th className="py-2 border">Sr</th>
                      <th className="py-2 border">Order Category</th>
                      <th className="py-2 border">API Key</th>
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
                          <span
                            className="mr-2 px-2 cursor-pointer py-1 bg-gray-400 text-white text-[12px] rounded-md disabled:opacity-50"
                            onClick={() => handleOpenModal(order)}
                          >
                            Edit
                          </span>
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm dark:text-white text-black">
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

        {paginatedData.length > 0 && selected !== null && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="flex items-center justify-center z-50">
              <div className="bg-white  dark:bg-bodyColor p-6 rounded-lg max-w-lg w-full">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold text-lg text-black dark:text-white">
                    Extend or Reduce User's Expiry
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium dark:text-white text-black  mb-2">
                      Select Type
                    </label>
                    <select
                      value={selectType}
                      onChange={(e) => setSelectType(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 dark:text-white text-black dark:bg-bodyColor bg-white rounded-lg shadow-sm focus:ring-darkPrimary focus:border-darkPrimary"
                    >
                      <option value="" disabled>
                        choose type
                      </option>
                      <option value="extended">Extended</option>
                      <option value="reduced">Reduced</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium dark:text-white text-black  mb-2">
                      Select Days
                    </label>
                    <select
                      value={selectDays}
                      onChange={(e) => setSelectDays(e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 dark:text-white text-black dark:bg-bodyColor bg-white rounded-lg shadow-sm focus:ring-darkPrimary focus:border-darkPrimary"
                    >
                      <option value="" disabled>
                        choose days
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                    </select>
                  </div>
                  <div className="flex flex-row items-end justify-end w-full mt-[30px]">
                    <button
                      onClick={() => onUpdateExpiry()}
                      className="w-[140px] h-[46px]  mw-12:w-[150px] leading-none flex flex-row items-center justify-center gap-x-2  mw-12:text-[14px]  bg-darkPrimary font-inter text-[#231F20] font-medium rounded-[50px] cursor-pointer hover:bg-white"
                    >
                      Update Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SubscriptionScreen;
