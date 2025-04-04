"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SERVER_URL, WALLET_ADDRESS } from "@/utils/server";
import axios from "axios";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { isSolanaWallet } from "@dynamic-labs/solana-core";
import { useDynamicContext , useDynamicModals,  DynamicMultiWalletPromptsWidget,} from "@dynamic-labs/sdk-react-core";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ToastContainer, toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";

const BuyScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("id");
  const [selectPlan, setSelectedPlan] = useState("");
  const [selectRegion, setSelectedRegion] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [status, setStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [solPrice, setSolPrice] = useState(null); // Current SOL price in USD
  const { primaryWallet, handleLogOut } = useDynamicContext();
  const { setShowLinkNewWalletModal } = useDynamicModals();
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(false);




  useEffect(() => {
    let getLoginWithEmail = JSON.parse(localStorage.getItem("l_w"));
    setIsLoginWithEmail(getLoginWithEmail);
    async function fetchSolPrice() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );

        const data = await response.json();

        const price = data.solana.usd; // Get SOL price in USD
        setSolPrice(price);
       
      } catch (error) {
        console.error("Error fetching Solana price:", error);
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
          setSelectedPlan(res.data.data.order_category.slice(4, 100));
          console.log(res.data.data.order_category.slice(4, 100));
        } else {
          console.error("Invalid response format", res);
        }
      })
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  const onChnageSelectedPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedRegion("");
    setSelectedDuration(null);
  };

  const payOrder = async () => {
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) {
      return toast.error("Please connect wallet first like Phantom!");
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
      (selectPlan.toLowerCase() === "getting-started"
        ? selectedDuration === 7
          ? 400
          : selectedDuration === 30
          ? 1200
          : selectedDuration === 90
          ? 3400
          : selectedDuration === 180
          ? 6000
          : ""
        : selectedDuration === 7
        ? 600
        : selectedDuration === 30
        ? 1800
        : selectedDuration === 90
        ? 4800
        : selectedDuration === 180
        ? 8000
        : "") / solPrice
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
        console.log(
          `Transaction successful: https://solscan.io/tx/${value.signature}?cluster=${cluster}`
        );
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

  const getExpiryDateForFreeNode = (date) => {
    const serviceStartDate = new Date(date);

    // Assuming the service lasts 30 days (adjust according to your actual duration)
    const serviceDuration = 1000; // in days

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
          selectPlan.toLowerCase() === "getting-started"
            ? selectedDuration === 7
              ? 400
              : selectedDuration === 30
              ? 1200
              : selectedDuration === 90
              ? 3400
              : selectedDuration === 180
              ? 6000
              : ""
            : selectedDuration === 7
            ? 600
            : selectedDuration === 30
            ? 1800
            : selectedDuration === 90
            ? 4800
            : selectedDuration === 180
            ? 8000
            : "",
        price_in_SOL: (
          (selectPlan.toLowerCase() === "getting-started"
            ? selectedDuration === 7
              ? 400
              : selectedDuration === 30
              ? 1200
              : selectedDuration === 90
              ? 3400
              : selectedDuration === 180
              ? 6000
              : ""
            : selectedDuration === 7
            ? 600
            : selectedDuration === 30
            ? 1800
            : selectedDuration === 90
            ? 4800
            : selectedDuration === 180
            ? 8000
            : "") / solPrice
        ).toFixed(4),

        operating_system: null,
        region: selectRegion,
        is_free_tier: false,
        order_region: selectRegion === "Ashburn, VA" ? "usa" : "europe",

        // expiry_date: getFormattedDate(getExpiryDate(Date.now()))
        ...(search === null && {
          order_category: "RPC-" + selectPlan.toLowerCase(),
          plan: selectPlan,
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

        router.push("/nodes");

        toast.success("Your order has been placed successfully");
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
        router.push("/nodes");

        toast.success("Your order has been renew successfully");
      }
    } catch (error) {
      toast.error(
        `Error during placed order ${error.response?.data || error.message}`
      );
    }
  };

  const freeOrder = async (e) => {
    let loginWithEmail = JSON.parse(localStorage.getItem("l_w"));
    if (loginWithEmail) {
      try {
        let body = {
          status: "active",
          price: 0,
          price_in_SOL: 0,
          operating_system: null,
          region: selectRegion,
          order_category: "RPC-" + selectPlan.toLowerCase(),
          plan: selectPlan,
          usage_used: 0,
          is_free_tier: true,
          order_region: "usa",
          expiry_date: getFormattedDate(getExpiryDateForFreeNode(Date.now()))
        };
        let token = JSON.parse(localStorage.getItem("u_t"));
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

        router.push("/nodes");

        toast.success("You've successfully got free tier.");
      } catch (error) {
        toast.error(
          "You've already got our free tier. To maintain uninterrupted access to our node. Please upgrade to a paid plan."
        );
      }
    } else {
      toast.error("Please login via Gmail to get your Free Node");
    }
  };

  const logoutToConnectWallet = async () => {
    try {
      await handleLogOut();
      // Set localStorage items after logout is complete
      localStorage.setItem("c_path", "/buy");
      localStorage.removeItem("u_t");
      localStorage.removeItem("l_w");
      localStorage.removeItem("role");
      setTimeout(() =>{
      setShowLinkNewWalletModal(true);
      }, 2000)      
    } catch (error) {
      console.error("Error during logout process:", error);
    }
  };

  const logoutToConnectGoogle = async () => {
    try {
      // Call handleLogOut and wait for it to complete
      await handleLogOut();
      
      // Set localStorage items after logout is complete
      localStorage.setItem("c_path", "/buy");
      localStorage.removeItem("u_t");
      localStorage.removeItem("l_w");
      localStorage.removeItem("role");
      toast.error("Free tiers must authenticate with google to avoid abuse!");
      setTimeout(() =>{
        redirect("/login")
      }, 2500)
     
    } catch (error) {
      console.error("Error during logout process:", error);
    }
  };
  return (
    <div className="h-full w-full max-w-[100vw] flex justify-center dark:bg-bodyColor bg-white">
      <div className="h-full w-full max-w-[1500px] p-2 lg:p-5">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <a
                className="transition-colors hover:text-foreground dark:text-white"
                href="/nodes"
              >
                Nodes
              </a>
            </li>
            <li
              role="presentation"
              aria-hidden="true"
              className="[&amp;>svg]:size-3.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right dark:text-white"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <a
                className="transition-colors hover:text-foreground dark:text-white"
                href="/buy"
              >
                Buy Node
              </a>
            </li>
          </ol>
        </nav>
        <div className="flex flex-row items-center gap-x-4 mb-5 mt-8">
          <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center text-black dark:text-black">
            1
          </div>
          <h1 className="text-xl font-semibold dark:text-white">Select Plan</h1>
        </div>
        {search === null && orderDetail === null ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div
              onClick={() => onChnageSelectedPlan("Free")}
              className={`${
                selectPlan === "Free" ? "opacity-90" : "opacity-50"
              } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#FF9B17] to-[#FF9B17] bg-[linear-gradient(324.64deg,rgba(104,64,253,0)0%,rgba(255,255,255,0.2)100%)] `}
            >
              <Image
                height={100}
                width={100}
                className="absolute pb-7 right-0 w-full h-full"
                src="/assets/dashboard/card-bg.svg"
                alt="card"
              />
              <div className="text-white font-semibold rounded-full w-[80px] text-center py-1 mb-3 bg-white/20 border border-white/50">
                Free
              </div>
              <div className="text-white font-semibold lg:h-[50px] mw-12:h-[70px]">
                Instant access to dedicated location
              </div>
              <ul className="flex flex-row  items-start gap-x-10 mx-2 mb-[50px] my-8 text-white text-[12px] xl:text-[14px] list-none  h-[120px]">
                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#FF9B17]">
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
                    <div className="flex-1">Unlimited Bandwith</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#FF9B17]">
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
                    <div className="flex-1">100,000 Requests</div>
                  </div>

                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#FF9B17]">
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
                    <div className="flex-1">10 rps Rate Limit</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#FF9B17]">
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
                    <div className="flex-1">Community Support</div>
                  </div>
                </li>

                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#FF9B17]">
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
                    <div className="flex-1">High Landing Rate</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#FF9B17]">
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
                    <div className="flex-1">Websocket Support</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#FF9B17]">
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
                    <div className="flex-1">Dedicated Regions</div>
                  </div>
                </li>
              </ul>
              <div className="flex flex-row  gap-x-4 text-xl text-white pl-[10px] my-6">
                <div className="text-white font-semibold">TPS</div>
                <div className="text-white/50">~20</div>
              </div>
              <div className="flex flex-row items-start gap-x-[50px]">
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px] ">
                      $0
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => onChnageSelectedPlan("Getting-Started")}
              className={`${
                selectPlan === "Getting-Started" ? "opacity-90" : "opacity-50"
              } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#6840FD] to-[#6840FD] bg-[linear-gradient(324.64deg,rgba(104,64,253,0)0%,rgba(255,255,255,0.2)100%)] `}
            >
              <Image
                height={100}
                width={100}
                className="absolute pb-7 right-0 w-full h-full"
                src="/assets/dashboard/card-bg.svg"
                alt="card"
              />
              <div className="text-white font-semibold rounded-full w-[150px] text-center py-1 mb-3 bg-white/20 border border-white/50">
                Getting Started
              </div>
              <div className="text-white font-semibold lg:h-[50px] mw-12:h-[70px]">
                Instant access to any location of your choice
              </div>
              <ul className="flex flex-row  items-start gap-x-10 mx-2 mb-[50px] my-8 text-white text-[12px] xl:text-[14px] list-none  h-[120px]">
                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">
                      Unlimited Bandwith &amp; Requests
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Unlimited Requests</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Enterprise Add-ons</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                  </div>
                </li>

                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">High Landing Rate</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Websocket Support</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Dedicated Regions</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Geyser gRPC</div>
                  </div>
                </li>
              </ul>
              <div className="flex flex-row  gap-x-4 text-xl text-white my-6 pl-[10px]">
                <div className="text-white font-semibold">TPS</div>
                <div className="text-white/50">~200</div>
              </div>
              <div className="flex flex-row items-start gap-x-[50px]">
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px] ">
                      $400
                    </span>
                    /1 week
                  </div>
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $1200
                    </span>
                    /1 month
                  </div>
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $3400
                    </span>
                    /3 month
                  </div>
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $6000
                    </span>
                    /6 month
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => onChnageSelectedPlan("Professional")}
              className={`${
                selectPlan === "Professional" ? "opacity-90" : "opacity-50"
              } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#41BF6D] to-[#41BF6D] bg-[linear-gradient(324.64deg,rgba(65,191,109,0)0%,rgba(255,255,255,0.2)100%)]`}
            >
              <Image
                height={100}
                width={100}
                className="absolute  pb-7 right-0 w-full h-full"
                src="/assets/dashboard/card-bg.svg"
                alt="card"
              />
              <div className="text-white font-semibold rounded-full w-[150px] text-center py-1 mb-3 bg-white/20 border border-white/50">
                Professional
              </div>
              <div className="text-white font-semibold lg:h-[50px] mw-12:h-[70px]">
                Take your trading to the next level with no rate limits and
                Instant access to all our node locations including, VA,
                Frankfurt and Amsterdam.
              </div>
              <ul className="flex flex-row  items-start gap-x-10  mx-2 mb-[50px] my-8 text-white text-[12px] xl:text-[14px] list-none  h-[120px]">
                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#41BF6D]">
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
                    <div className="flex-1">
                      Unlimited Bandwith &amp; Requests
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#41BF6D]">
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
                    <div className="flex-1">No Rate Limit</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Enterprise Add-ons</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                  </div>
                </li>
                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">High Landing Rate</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Websocket Support</div>
                  </div>

                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Dedicated Regions</div>
                  </div>

                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Geyser gRPC</div>
                  </div>
                </li>
              </ul>
              <div className="flex flex-row gap-x-4 text-xl text-white my-6 pl-[10px]">
                <div className="text-white font-semibold">TPS</div>
                <div className="text-white/50">~1000</div>
              </div>
              <div className="flex flex-row items-start gap-x-[50px]">
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px]">
                      $600
                    </span>
                    /1 week
                  </div>
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px] ">
                      $1800
                    </span>
                    /1 month
                  </div>
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $4800
                    </span>
                    /3 month
                  </div>
                  <div className="text-white/50 text-2xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $8000
                    </span>
                    /6 month
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : orderDetail?.order_category.slice(4, 100).toLowerCase() ===
          "getting-started" ? (
          <div className="grid mw-11:grid-cols-1 mw-12:grid-cols-2  lg:grid-cols-2 gap-5">
            <div
              onClick={() => onChnageSelectedPlan("Getting-Started")}
              className={`${
                selectPlan.toLowerCase() === "getting-started"
                  ? "opacity-90"
                  : "opacity-50"
              } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#6840FD] to-[#6840FD] bg-[linear-gradient(324.64deg,rgba(104,64,253,0)0%,rgba(255,255,255,0.2)100%)] `}
            >
              <Image
                height={100}
                width={100}
                className="absolute pb-7 right-0 w-full h-full"
                src="/assets/dashboard/card-bg.svg"
                alt="card"
              />
              <div className="text-white font-semibold rounded-full w-[150px] text-center py-1 mb-3 bg-white/20 border border-white/50">
                Getting Started
              </div>
              <div className="text-white font-semibold lg:h-[50px] mw-12:h-[70px]">
                Instant access to any location of your choice
              </div>
              <ul className="flex flex-row  items-start gap-x-10 mx-2 mb-[50px] my-8 text-white text-sm xl:text-base list-none  h-[120px]">
                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">
                      Unlimited Bandwith &amp; Requests
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">200 Requests per 10 Seconds</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Enterprise Add-ons</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                  </div>
                </li>

                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">High Landing Rate</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Websocket Support</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Dedicated Regions</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Geyser gRPC</div>
                  </div>
                </li>
              </ul>
              <div className="flex flex-row  gap-x-4 text-xl text-white my-6">
                <div className="text-white font-semibold">TPS</div>
                <div className="text-white/50">~500</div>
              </div>
              <div className="flex flex-row items-start gap-x-[50px]">
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px] ">
                      $400
                    </span>
                    /1 week
                  </div>
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $1200
                    </span>
                    /1 month
                  </div>
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $3400
                    </span>
                    /3 month
                  </div>
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      6000
                    </span>
                    /6 month
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid mw-11:grid-cols-1 mw-12:grid-cols-2  lg:grid-cols-2 gap-5">
            <div
              onClick={() => onChnageSelectedPlan("Professional")}
              className={`${
                selectPlan.toLowerCase() === "professional"
                  ? "opacity-90"
                  : "opacity-50"
              } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#41BF6D] to-[#41BF6D] bg-[linear-gradient(324.64deg,rgba(65,191,109,0)0%,rgba(255,255,255,0.2)100%)]`}
            >
              <Image
                height={100}
                width={100}
                className="absolute  pb-7 right-0 w-full h-full"
                src="/assets/dashboard/card-bg.svg"
                alt="card"
              />
              <div className="text-white font-semibold rounded-full w-[150px] text-center py-1 mb-3 bg-white/20 border border-white/50">
                Professional
              </div>
              <div className="text-white font-semibold lg:h-[50px] mw-12:h-[70px]">
                Take your trading to the next level with no rate limits and
                Instant access to all our node locations including, VA,
                Frankfurt and Amsterdam.
              </div>
              <ul className="flex flex-row  items-start gap-x-10  mx-2 mb-[50px] my-8 text-white text-sm xl:text-base list-none  h-[120px]">
                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#41BF6D]">
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
                    <div className="flex-1">
                      Unlimited Bandwith &amp; Requests
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex-none text-[#41BF6D]">
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
                    <div className="flex-1">No Rate Limit</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Enterprise Add-ons</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                  </div>
                </li>
                <li className="flex flex-col items-start gap-y-2">
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">High Landing Rate</div>
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Websocket Support</div>
                  </div>

                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Dedicated Regions</div>
                  </div>

                  <div className="flex flex-row items-center gap-x-2">
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
                    <div className="flex-1">Geyser gRPC</div>
                  </div>
                </li>
              </ul>
              <div className="flex flex-row gap-x-4 text-xl text-white my-6">
                <div className="text-white font-semibold">TPS</div>
                <div className="text-white/50">~1000</div>
              </div>
              <div className="flex flex-row items-start gap-x-[50px]">
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px]">
                      $600
                    </span>
                    /1 week
                  </div>
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px] ">
                      $1800
                    </span>
                    /1 month
                  </div>
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $4800
                    </span>
                    /3 month
                  </div>
                  <div className="text-white/50 text-3xl">
                    <span className="text-white font-semibold pl-[10px]  ">
                      $8000
                    </span>
                    /6 month
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectPlan !== "Free" && (
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
              <div
                onClick={() => setSelectedDuration(7)}
                className={`flex w-full p-5 ${
                  selectedDuration === 7
                    ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                    : "dark:text-white"
                }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
              >
                1 week
              </div>
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
                className={`flex w-full p-5 ${
                  selectedDuration === 90
                    ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                    : "dark:text-white"
                }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
              >
                3 month
              </div>
              <div
                onClick={() => setSelectedDuration(180)}
                className={`flex w-full p-5 ${
                  selectedDuration === 180
                    ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                    : "dark:text-white"
                }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
              >
                6 month
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="flex flex-row items-center gap-x-4 mb-5">
            <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center text-black dark:text-black">
              3
            </div>
            <h1 className="text-xl dark:text-white font-semibold">
              Select Region
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {selectPlan !== "Free" && (
              <>
                <div
                  onClick={() => setSelectedRegion("Amsterdam")}
                  className={`flex w-full p-5 ${
                    selectRegion === "Amsterdam"
                      ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                      : "dark:text-white"
                  }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
                >
                  Amsterdam
                </div>
                <div
                  onClick={() => setSelectedRegion("Frankfurt")}
                  className={`flex w-full p-5 ${
                    selectRegion === "Frankfurt"
                      ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                      : "dark:text-white"
                  }  items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
                >
                  Frankfurt
                </div>
              </>
            )}

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
          </div>
        </div>
        <div className="my-20 min-h-96">
          {selectedDuration !== null && (
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
                      {selectPlan === "Getting-Started"
                        ? selectedDuration === 7
                          ? 400
                          : selectedDuration === 30
                          ? 1200
                          : selectedDuration === 90
                          ? 3400
                          : selectedDuration === 180
                          ? 6000
                          : ""
                        : selectedDuration === 7
                        ? 600
                        : selectedDuration === 30
                        ? 1800
                        : selectedDuration === 90
                        ? 4800
                        : selectedDuration === 180
                        ? 8000
                        : ""}
                    </p>
                  </div>
                  <div className="">
                    <p className="dark:text-white">
                      {selectedDuration === 7
                        ? "1 week"
                        : selectedDuration / 30 + " month"}
                    </p>
                  </div>
                  <p className="dark:text-white">
                    $
                    {selectPlan === "Getting-Started"
                      ? selectedDuration === 7
                        ? 400
                        : selectedDuration === 30
                        ? 1200
                        : selectedDuration === 90
                        ? 3400
                        : selectedDuration === 180
                        ? 6000
                        : ""
                      : selectedDuration === 7
                      ? 600
                      : selectedDuration === 30
                      ? 1800
                      : selectedDuration === 90
                      ? 4800
                      : selectedDuration === 180
                      ? 8000
                      : ""}
                  </p>
                </div>
                <hr className="my-2.5" />
                <div className="flex justify-end">
                  <div className="w-full md:w-fit min-w-80">
                    <div className="flex justify-between">
                      <p className="font-medium dark:text-white">Subtotal</p>
                      <p className="dark:text-white">
                        {(
                          (selectPlan === "Getting-Started"
                            ? selectedDuration === 7
                              ? 400
                              : selectedDuration === 30
                              ? 1200
                              : selectedDuration === 90
                              ? 3400
                              : selectedDuration === 180
                              ? 6000
                              : ""
                            : selectedDuration === 7
                            ? 600
                            : selectedDuration === 30
                            ? 1800
                            : selectedDuration === 90
                            ? 4800
                            : selectedDuration === 180
                            ? 8000
                            : "") / solPrice
                        ).toFixed(4)}
                        &nbsp; SOL
                      </p>
                      {/* <p className="dark:text-white">2.12 SOL</p> */}
                    </div>
                    <hr className="my-2.5" />
                    <div className="flex justify-between">
                      <p className="font-medium dark:text-white">Total</p>
                      <p className="dark:text-white">
                        {(
                          (selectPlan === "Getting-Started"
                            ? selectedDuration === 7
                              ? 400
                              : selectedDuration === 30
                              ? 1200
                              : selectedDuration === 90
                              ? 3400
                              : selectedDuration === 180
                              ? 6000
                              : ""
                            : selectedDuration === 7
                            ? 600
                            : selectedDuration === 30
                            ? 1800
                            : selectedDuration === 90
                            ? 4800
                            : selectedDuration === 180
                            ? 8000
                            : "") / solPrice
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
                {isLoginWithEmail ? (
                  <div>
                    <button
                      onClick={(e) => logoutToConnectWallet(e)}
                      className="bg-gray-200 flex justify-center items-center font-semibold gap-2.5 text-[16px] px-5 py-2  text-[#231F20] rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu hover:bg-white   w-full mt-5  flex-row "
                    >
                      <MdAccountBalanceWallet size={22} color={"#231F20"} />{" "}
                      Continue with Wallet
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={(e) => payOrder(e)}
                      className="bg-darkPrimary flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2  text-[#231F20] rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu hover:bg-white   w-full mt-5  flex-row "
                    >
                      Pay Now
                    </button>
                    <p className="mt-2.5 w-full text-center text-sm text-gray-400">
                      Payments are made in Solana. Plan doesn't auto-renew.
                    </p>
                  </>
                )}
              </div>
            </>
          )}

          {selectPlan === "Free" && selectRegion !== "" && (
            <>
              <hr className="my-4" />
              {isLoginWithEmail ? (
                <div>
                  <button
                    onClick={(e) => freeOrder(e)}
                    className="bg-darkPrimary flex justify-center items-center font-semibold gap-2.5 text-sm px-5 py-2  text-[#231F20] rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu hover:bg-white   w-full mt-5  flex-row "
                  >
                    Get Free Node Now
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={(e) => logoutToConnectGoogle(e)}
                    className="bg-gray-200 flex justify-center items-center font-semibold gap-2.5 text-[16px] px-5 py-2  text-[#231F20] rounded-md hover:scale-[1.01] transition-all duration-200 transform-gpu hover:bg-white   w-full mt-5  flex-row "
                  >
                    <FaGoogle size={22} color={"#231F20"} /> Continue with
                    Google
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <DynamicMultiWalletPromptsWidget />
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

export default BuyScreen;
