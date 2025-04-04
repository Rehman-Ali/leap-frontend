"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SERVER_URL, WALLET_ADDRESS } from "@/utils/server";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { isSolanaWallet } from "@dynamic-labs/solana-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ToastContainer, toast } from "react-toastify";

const BuyVPSScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("id");
  const [selectPlan, setSelectedPlan] = useState("Basic");
  const [selectRegion, setSelectedRegion] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [status, setStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);

  const [solPrice, setSolPrice] = useState(null); // Current SOL price in USD

  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    async function fetchSolPrice() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        const price = data.solana.usd; // Get SOL price in USD
        setSolPrice(price);
      } catch (error) {
        toast.error("Error fetching Solana price");
      }
    }

    fetchSolPrice();
  }, []);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("u_t"));
    axios
      .get(`${SERVER_URL}/api/order/get-single/${search}`, {
        headers: {
          "x-auth-token": token
        }
      })
      .then((res) => {
        if (res.data && res.data.data) {
          setOrderDetail(res.data.data);
          setOperatingSystem(res.data.data.operating_system);
        } else {
          console.error("Invalid response format", res);
        }
      })
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  const payOrder = async () => {
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) {
      return;
    }

    const connection = await primaryWallet.getConnection();
    const cluster = connection.rpcEndpoint.includes("devnet")
      ? "devnet"
      : "mainnet";

    const fromKey = new PublicKey(primaryWallet.address);
    const toKey = new PublicKey(WALLET_ADDRESS);

    const balance = await connection.getBalance(fromKey);

    // const amountInLamports = 0.0;
    const value = (
      (operatingSystem === "windows"
        ? (80 / 30) * selectedDuration
        : (60 / 30) * selectedDuration) /
        solPrice -
      ((operatingSystem === "windows"
        ? (80 / 30) * selectedDuration
        : (60 / 30) * selectedDuration) /
        solPrice /
        100) *
        (selectedDuration === 90 ? 10 : selectedDuration === 180 ? 15 : 0)
    ).toFixed(4);

    // const amountInLamports = 0 * 1000000000;
    const amountInLamports = Math.round(value * 1000000000);

    // check if wallet have balance or not
    // const estimatedFee = 5000; // Solana transactions typically cost around 5000 lamports
    const totalCost = amountInLamports;
    // const totalCost = 0;

    if (balance < totalCost) {
      toast.error("Insufficient balance to complete this transaction.");
      return;
    }

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKey,
        lamports: amountInLamports,
        toPubkey: toKey
      })
    );
    const blockhash = await connection.getLatestBlockhash();
    transferTransaction.recentBlockhash = blockhash.blockhash;
    transferTransaction.feePayer = fromKey;

    const signer = await primaryWallet.getSigner();

    await signer
      .signAndSendTransaction(transferTransaction)
      .then((value) => {
        onConfirmOrder();
      })
      .catch((error) => {
        toast.error(error || "Transaction failed. Try again!.");
      });
  };

  const getExpiryDate = (date) => {
    const serviceStartDate = new Date(date);

    // Assuming the service lasts 30 days (adjust according to your actual duration)
    const serviceDuration = selectedDuration; // in days

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

  const onConfirmOrder = async () => {
    try {
      let body = {
        duration: selectedDuration,
        status: "active",
        price:
          (operatingSystem === "windows"
            ? (80 / 30) * selectedDuration
            : (60 / 30) * selectedDuration) -
          ((operatingSystem === "windows"
            ? (80 / 30) * selectedDuration
            : (60 / 30) * selectedDuration) /
            100) *
            (selectedDuration === 90 ? 10 : selectedDuration === 180 ? 15 : 0),
        price_in_SOL: (
          (operatingSystem === "windows"
            ? (80 / 30) * selectedDuration
            : (60 / 30) * selectedDuration) /
            solPrice -
          ((operatingSystem === "windows"
            ? (80 / 30) * selectedDuration
            : (60 / 30) * selectedDuration) /
            solPrice /
            100) *
            (selectedDuration === 90 ? 10 : selectedDuration === 180 ? 15 : 0)
        ).toFixed(4),
        order_category: "vps",
        operating_system: operatingSystem,
        region: selectRegion,
        plan: selectPlan,
        is_free_tier: false,
        order_region:
          selectRegion === "AMS - Netherlands" ||
          selectRegion === "FRS - France"
            ? "europe"
            : "usa",
        // expiry_date: getFormattedDate(getExpiryDate(Date.now()))
        ...(search === null && {
          expiry_date: getFormattedDate(getExpiryDate(Date.now()))
        })
      };
      let token = JSON.parse(localStorage.getItem("u_t"));
      if (search === null) {
        const response = await axios.post(
          `${SERVER_URL}/api/order/create`,
          body,
          {
            headers: {
              "x-auth-token": token
            }
          }
        );
        // save invoice
        await axios.post(`${SERVER_URL}/api/invoice/create`, body, {
          headers: {
            "x-auth-token": token
          }
        });

        toast.success("Your order has been placed successfully");

        router.push("/vps-info");
      } else {
        const response = await axios.put(
          `${SERVER_URL}/api/order/update/${search}`,
          body,
          {
            headers: {
              "x-auth-token": token
            }
          }
        );
        // save invoice
        await axios.post(`${SERVER_URL}/api/invoice/create`, body, {
          headers: {
            "x-auth-token": token
          }
        });
        router.push("/vps-info");

        toast.success("Your order has been renew successfully");
      }
    } catch (error) {
      toast.error(
        `Error during placed order ${error.response?.data || error.message}`
      );
    }
  };

  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <h1 className="text-xl font-semibold dark:text-white">Buy VPS</h1>
        <div className="flex flex-row items-center gap-x-4 mb-5 mt-8">
          <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center text-black dark:text-black">
            1
          </div>
          <h1 className="text-xl font-semibold dark:text-white">Select Plan</h1>
        </div>
        <div className="grid mw-11:grid-cols-1 mw-12:grid-cols-2  lg:grid-cols-3 gap-5">
          <div
            onClick={() => setSelectedPlan("Basic")}
            className={`${
              selectPlan === "Basic" ? "opacity-90" : "opacity-50"
            } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#6840FD] to-[#6840FD] bg-[linear-gradient(324.64deg,rgba(104,64,253,0)0%,rgba(255,255,255,0.2)100%)] `}
          >
            <Image
              height={100}
              width={100}
              className="absolute pb-7 right-0 w-full h-full"
              src="/assets/dashboard/card-bg.svg"
              alt="card"
            />
            <div className="text-white font-semibold rounded-full w-20 text-center py-1 mb-3 bg-white/20 border border-white/50">
              Basic
            </div>
            <div className="text-white font-semibold h-6 lg:h-8">
              For small traders just getting started.
            </div>
            <ul className="mx-2 my-8 text-white text-sm xl:text-base list-none space-y-1.5 h-[200px]">
              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#6840FD]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.723633"
                      y="0.220703"
                      width="23.9443"
                      height="23.9443"
                      rx="11.9722"
                      fill="white"
                    ></rect>
                    <path
                      d="M8.2063 12.1927L11.1993 15.1858L17.1854 9.19971"
                      stroke="currentColor"
                      strokeWidth="1.99536"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">Unlimited Bandwith &amp; Requests</div>
              </li>

              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#6840FD]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.723633"
                      y="0.220703"
                      width="23.9443"
                      height="23.9443"
                      rx="11.9722"
                      fill="white"
                    ></rect>
                    <path
                      d="M8.2063 12.1927L11.1993 15.1858L17.1854 9.19971"
                      stroke="currentColor"
                      strokeWidth="1.99536"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">Unlimited Rate Limit</div>
              </li>

              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#6840FD]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.723633"
                      y="0.220703"
                      width="23.9443"
                      height="23.9443"
                      rx="11.9722"
                      fill="white"
                    ></rect>
                    <path
                      d="M8.2063 12.1927L11.1993 15.1858L17.1854 9.19971"
                      stroke="currentColor"
                      strokeWidth="1.99536"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">Premium Support</div>
              </li>
            </ul>
            {/* <div className="flex flex-row gap-x-4 text-xl text-white my-6">
              <div className="text-white font-semibold">TPS</div>
              <div className="text-white/50">~100</div>
            </div> */}
            <div className="text-white/50 text-3xl">
              Windows
              <span className="text-white font-semibold pl-[10px]">$80</span>
              /month
            </div>
            <div className="text-white/50 text-3xl">
              Linux
              <span className="text-white font-semibold pl-[10px]">$60</span>
              /month
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-row items-center gap-x-4 mb-5">
            <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center text-black dark:text-black ">
              2
            </div>
            <h1 className="text-xl dark:text-white font-semibold">
              Select Operating System
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div
              onClick={() => setOperatingSystem("windows")}
              className={`flex w-full p-5 ${
                operatingSystem === "windows"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              Windows
            </div>
            <div
              onClick={() => setOperatingSystem("linux")}
              className={`flex w-full p-5 ${
                operatingSystem === "linux"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              Linux
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-row items-center gap-x-4 mb-5">
            <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center text-black dark:text-black ">
              2
            </div>
            <h1 className="text-xl dark:text-white font-semibold">
              Select Duration
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* <div
              onClick={() => setSelectedDuration(7)}
              className={`flex w-full p-5 ${
                selectedDuration === 7
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              1 week
            </div> */}
            <div
              onClick={() => setSelectedDuration(30)}
              className={`flex w-full p-5 ${
                selectedDuration === 30
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              1 month
            </div>
            <div
              onClick={() => setSelectedDuration(90)}
              className={`flex justify-between  w-full p-5 ${
                selectedDuration === 90
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              <p>3 month</p>
              <span
                className={`flex text-[12px] px-2 py-1 items-center border rounded-lg cursor-pointer transition-colors border-gray-300 dark:hover:text-bodyColor`}
              >
                Discount 10%
              </span>
            </div>
            <div
              onClick={() => setSelectedDuration(180)}
              className={`flex justify-between w-full p-5 ${
                selectedDuration === 180
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              <p>6 month</p>
              <span
                className={`flex text-[12px] px-2 py-1 items-center border rounded-lg cursor-pointer transition-colors border-gray-300 dark:hover:text-bodyColor`}
              >
                Discount 15%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-row items-center gap-x-4 mb-5">
            <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center text-black dark:text-black">
              4
            </div>
            <h1 className="text-xl dark:text-white font-semibold">
              Select Region
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div
              onClick={() => setSelectedRegion("Dallas, TX")}
              className={`flex w-full p-5 ${
                selectRegion === "Dallas, TX"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              Dallas, TX
            </div>
            <div
              onClick={() => setSelectedRegion("Charlotte, NC")}
              className={`flex w-full p-5 ${
                selectRegion === "Charlotte, NC"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              Charlotte, NC
            </div>
            <div
              onClick={() => setSelectedRegion("AMS - Netherlands")}
              className={`flex w-full p-5 ${
                selectRegion === "AMS - Netherlands"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }   items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              AMS - Netherlands
            </div>
            <div
              onClick={() => setSelectedRegion("Bend, OR")}
              className={`flex dark:text-white ${
                selectRegion === "Bend, OR"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              } w-full p-5 items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              Bend, OR
            </div>
            <div
              onClick={() => setSelectedRegion("Latham, NY")}
              className={`flex w-full ${
                selectRegion === "Latham, NY"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              }   p-5 items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              Latham, NY
            </div>
            <div
              onClick={() => setSelectedRegion("FRS - France")}
              className={`flex w-full ${
                selectRegion === "FRS - France"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              } p-5  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              FRS - France
            </div>
            <div
              onClick={() => setSelectedRegion("Ashburn, VA")}
              className={`flex w-full  ${
                selectRegion === "Ashburn, VA"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              } p-5  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100  dark:hover:text-black`}
            >
              Ashburn, VA
            </div>
            <div
              onClick={() => setSelectedRegion("Staten Island, NY")}
              className={`flex w-full p-5  ${
                selectRegion === "Staten Island, NY"
                  ? "dark:bg-gray-100 dark:text-bodyColor  bg-gray-100 "
                  : "dark:text-white"
              } items-center  gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-black`}
            >
              Staten Island, NY
            </div>
          </div>
        </div>
        <div className="my-20 min-h-96">
          {selectPlan !== "" && (
            <>
              <hr className="my-4" />
              <div>
                <div className="flex justify-between items-center">
                  <div className="grid grid-cols-2">
                    <p className="text-gray-500 dark:text-white">Plan:</p>
                    <h2 className="dark:text-white">{selectPlan} Node</h2>
                    <p className="text-gray-500 dark:text-white">Region:</p>
                    <p className="dark:text-white">{selectRegion}</p>
                  </div>
                  <div className="">
                    <p className="dark:text-white">
                      $
                      {operatingSystem === "windows"
                        ? ((80 / 30) * selectedDuration).toFixed(2)
                        : ((60 / 30) * selectedDuration).toFixed(2)}
                    </p>
                  </div>
                  <div className="">
                    <p className="dark:text-white">
                      {selectedDuration === 7
                        ? "1 week"
                        : selectedDuration / 30 + "month"}{" "}
                    </p>
                  </div>
                  <p className="dark:text-white">
                    $
                    {operatingSystem === "windows"
                      ? ((80 / 30) * selectedDuration).toFixed(2)
                      : ((60 / 30) * selectedDuration).toFixed(2)}
                  </p>
                </div>
                <hr className="my-2.5" />
                <div className="flex justify-end">
                  <div className="w-full md:w-fit min-w-80">
                    <div className="flex justify-between">
                      <p className="font-medium dark:text-white">Subtotal</p>
                      <p className="dark:text-white">
                        {(
                          (operatingSystem === "windows"
                            ? (80 / 30) * selectedDuration
                            : (60 / 30) * selectedDuration) / solPrice
                        ).toFixed(4)}
                        &nbsp; SOL
                      </p>
                    </div>
                    <hr className="my-2.5" />
                    <div className="flex justify-between">
                      <p className="font-medium dark:text-white">
                        Discount (
                        {selectedDuration === 90
                          ? "10%"
                          : selectedDuration === 180
                          ? "15%"
                          : "0%"}
                        )
                      </p>
                      <p className="dark:text-white">
                        {(
                          ((operatingSystem === "windows"
                            ? (80 / 30) * selectedDuration
                            : (60 / 30) * selectedDuration) /
                            solPrice /
                            100) *
                          (selectedDuration === 90
                            ? 10
                            : selectedDuration === 180
                            ? 15
                            : 0)
                        ).toFixed(4)}
                        &nbsp; SOL
                      </p>
                    </div>
                    <hr className="my-2.5" />
                    <div className="flex justify-between">
                      <p className="font-medium dark:text-white">Total</p>
                      <p className="dark:text-white">
                        {(
                          (operatingSystem === "windows"
                            ? (80 / 30) * selectedDuration
                            : (60 / 30) * selectedDuration) /
                            solPrice -
                          ((operatingSystem === "windows"
                            ? (80 / 30) * selectedDuration
                            : (60 / 30) * selectedDuration) /
                            solPrice /
                            100) *
                            (selectedDuration === 90
                              ? 10
                              : selectedDuration === 180
                              ? 15
                              : 0)
                        ).toFixed(4)}
                        &nbsp; SOL
                      </p>
                    </div>
                    <hr className="my-2.5" />
                    <p className="text-sm text-red-500 h-4"></p>
                  </div>
                </div>

                {status && <p className="text-red-700">{status}</p>}
                {transactionId && (
                  <div>
                    Transaction ID:{" "}
                    <a
                      href={`https://explorer.solana.com/tx/${transactionId}?cluster=mainnet-beta`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {transactionId}
                    </a>
                  </div>
                )}
                <button
                  onClick={(e) => payOrder(e)}
                  className="bg-darkPrimary flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2  text-[#231F20] rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu hover:bg-white   w-full mt-5  flex-row "
                >
                  Pay Now
                </button>
                <p className="mt-2.5 w-full text-center text-sm text-gray-400">
                  Payments are made in Solana. Plan doesn't auto-renew.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
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

export default BuyVPSScreen;
