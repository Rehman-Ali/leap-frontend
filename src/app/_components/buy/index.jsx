"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} from "@solana/web3.js";
import { SERVER_URL, WALLET_ADDRESS } from "@/utils/server";
import axios from "axios";
import Swal from "sweetalert2";

const BuyScreen = () => {
  const [selectPlan, setSelectedPlan] = useState("");
  const [selectRegion, setSelectedRegion] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [status, setStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [solPrice, setSolPrice] = useState(null); // Current SOL price in USD
  // const productPriceUSD = 80; // Product price in USD
  // const [solAmount, setSolAmount] = useState(null);

  useEffect(() => {
    async function fetchSolPrice() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await response.json();
        const price = data.solana.usd; // Get SOL price in USD
        setSolPrice(price);
        // setSolAmount((productPriceUSD / price).toFixed(4)); // Calculate price in SOL
      } catch (error) {
        console.error("Error fetching Solana price:", error);
      }
    }

    fetchSolPrice();
  }, []);

  const payOrder = async (e) => {
    e.preventDefault();
    setStatus("");

    const toAddress = WALLET_ADDRESS;
    const value = (
      (operatingSystem === "windows" ? 80 : 60) / solPrice
    ).toFixed(4);

    try {
      // Use the appropriate endpoint for your environment
      const connection = new Connection("https://api.devnet.solana.com"); // Devnet
      const fromWallet = window.solana; // Assumes a wallet like Phantom is installed

      if (!fromWallet || !fromWallet.isPhantom) {
        setStatus("Please connect to a Solana wallet like Phantom.");
        return;
      }

      // Request wallet connection
      const { publicKey } = await fromWallet.connect();

      // Fetch the latest blockhash
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: parseFloat(value) * 1e9 // Convert SOL to lamports
        })
      );
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Request the wallet to sign the transaction
      const signedTransaction = await fromWallet.signTransaction(transaction);

      // Send the signed transaction
      const txId = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Confirm the transaction using the updated confirmation strategy
      const confirmation = await connection.confirmTransaction({
        signature: txId,
        blockhash,
        lastValidBlockHeight
      });

      if (confirmation.value.err) {
        throw new Error("Transaction failed.");
      }

      setTransactionId(txId);
      setStatus("Transaction confirmed!");
      onConfirmOrder();
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);

      onConfirmOrder();
    }
  };

  const onConfirmOrder = async () => {
    try {
      let body = {
        duration: "month",
        status: "success",
        price: operatingSystem === "windows" ? "80" : "60",
        price_in_SOL: (
          (operatingSystem === "windows" ? 80 : 60) / solPrice
        ).toFixed(4),
        order_category: "vps",
        operating_system: operatingSystem,
        region: setSelectedRegion,
        plan: setSelectedPlan
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
      console.log(response.data, "Response received");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your order has been placed successfully",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error during placed order ${
          error.response?.data || error.message
        }`,
        showConfirmButton: false,
        timer: 1500
      });
      console.error(
        "Error during placed order",
        error.response?.data || error.message
      );
    }
  };

  console.log(
    operatingSystem === "windows" ? 80 : 60,
    solPrice,
    "price of in SOL"
  );

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
          <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center">
            1
          </div>
          <h1 className="text-xl font-semibold dark:text-white">Select Plan</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                <div className="flex-1">200 Requests per 10 Seconds</div>
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
                <div className="flex-1">High Landing Rate</div>
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
                <div className="flex-1">Websocket Support</div>
              </li>
            </ul>
            <div className="flex flex-row gap-x-4 text-xl text-white my-6">
              <div className="text-white font-semibold">TPS</div>
              <div className="text-white/50">~100</div>
            </div>
            <div className="text-white/50 text-3xl">
              Windows
              <span className="text-white font-semibold pl-[10px]">$80</span>
              /month
            </div>
            <div className="text-white/50 text-3xl">
              Linux
              <span className="text-white font-semibold pl-[60px]">$60</span>
              /month
            </div>
          </div>
          <div
            onClick={() => setSelectedPlan("Pro")}
            className={`${
              selectPlan === "Pro" ? "opacity-90" : "opacity-50"
            } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#41BF6D] to-[#41BF6D] bg-[linear-gradient(324.64deg,rgba(65,191,109,0)0%,rgba(255,255,255,0.2)100%)]`}
          >
            <Image
              height={100}
              width={100}
              className="absolute  pb-7 right-0 w-full h-full"
              src="/assets/dashboard/card-bg.svg"
              alt="card"
            />
            <div className="text-white font-semibold rounded-full w-20 text-center py-1 mb-3 bg-white/20 border border-white/50">
              Pro
            </div>
            <div className="text-white font-semibold h-6 lg:h-8">
              For botters with moderate transaction and performance needs.
            </div>
            <ul className="mx-2 my-8 text-white text-sm xl:text-base list-none space-y-1.5 h-[200px]">
              <li className="flex flex-row items-center gap-x-2">
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
                <div className="flex-1">Unlimited Bandwith &amp; Requests</div>
              </li>
              <li className="flex flex-row items-center gap-x-2">
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
              </li>
              <li className="flex flex-row items-center gap-x-2">
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
                <div className="flex-1">High Landing Rate</div>
              </li>
              <li className="flex flex-row items-center gap-x-2">
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
                <div className="flex-1">Websocket Support</div>
              </li>
              <li className="flex flex-row items-center gap-x-2">
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
                <div className="flex-1">Dedicated Regions</div>
              </li>
            </ul>
            <div className="flex flex-row gap-x-4 text-xl text-white my-6">
              <div className="text-white font-semibold">TPS</div>
              <div className="text-white/50">~1000</div>
            </div>
            <div className="text-white/50 text-3xl">
              Windows
              <span className="text-white font-semibold pl-[10px]">$80</span>
              /month
            </div>
            <div className="text-white/50 text-3xl">
              Linux
              <span className="text-white font-semibold pl-[60px]">$60</span>
              /month
            </div>
          </div>
          <div
            onClick={() => setSelectedPlan("God")}
            className={`${
              selectPlan === "God" ? "opacity-90" : "opacity-50"
            } rounded-xl px-5 py-6 relative shadow-lg cursor-pointer hover:scale-[1.01] hover:opacity-90 transition-all duration-200 transform-gpu bg-gradient-to-t from-[#F5A93A] to-[#F5A93A] bg-[linear-gradient(324.64deg,rgba(245,169,58,0)0%,rgba(255,255,255,0.2)100%)] opacity-50`}
          >
            <Image
              height={100}
              width={100}
              className="absolute  pb-7 right-0 w-full h-full"
              src="/assets/dashboard/card-bg.svg"
              alt="card"
            />
            <div className="text-white font-semibold rounded-full w-20 text-center py-1 mb-3 bg-white/20 border border-white/50">
              God
            </div>
            <div className="text-white font-semibold h-6 lg:h-8">
              For botters looking to scale and maximize every snipe.
            </div>
            <ul className="mx-2 my-8 text-white text-sm xl:text-base list-none space-y-1.5 h-[200px]">
              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#F5A93A]">
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
                <div className="flex-none text-[#F5A93A]">
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
              </li>
              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#F5A93A]">
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
              </li>
              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#F5A93A]">
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
              </li>
              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#F5A93A]">
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
              </li>
              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#F5A93A]">
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
              </li>
              <li className="flex flex-row items-center gap-x-2">
                <div className="flex-none text-[#F5A93A]">
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
                <div className="flex-1">Enterprise Add-Ons</div>
              </li>
            </ul>
            <div className="flex flex-row gap-x-4 text-xl text-white my-6">
              <div className="text-white font-semibold">TPS</div>
              <div className="text-white/50">MAX (~ 6000)</div>
            </div>
            <div className="text-white/50 text-3xl">
              Windows
              <span className="text-white font-semibold pl-[10px]">$80</span>
              /month
            </div>
            <div className="text-white/50 text-3xl">
              Linux
              <span className="text-white font-semibold pl-[60px]">$60</span>
              /month
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-row items-center gap-x-4 mb-5">
            <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center">
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
              className={`flex dark:text-white ${
                operatingSystem === "linux"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              } w-full p-5 items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
            >
              Linux
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-row items-center gap-x-4 mb-5">
            <div className="w-6 h-6 bg-[#f4f4f5] rounded-full flex items-center justify-center">
              3
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
              className={`flex dark:text-white ${
                selectRegion === "Charlotte, NC"
                  ? "dark:bg-gray-100 dark:text-bodyColor bg-gray-100"
                  : "dark:text-white"
              } w-full p-5 items-center gap-2 border rounded-lg cursor-pointer transition-colors border-gray-300 hover:bg-gray-100 dark:hover:text-bodyColor`}
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
          {/* <div className="flex justify-between mt-10 align-center flex-col md:flex-row gap-2">
            <h1 className="text-xl font-semibold dark:text-white">Summary</h1>
            <div className="rounded-xl border flex gap-2 text-sm p-1.5 w-fit">
              <div className="px-2.5 py-1.5 rounded-md dark:text-white cursor-pointer select-none bg-black text-white">
                Monthly
              </div>
              <div className="px-2.5 py-1.5 rounded-md cursor-pointer dark:text-white select-none border text-black">
                Yearly (Save 10%)
              </div>
            </div>
          </div> */}
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
                      ${operatingSystem === "windows" ? 80 : 60}
                    </p>
                  </div>
                  <div className="">
                    <p className="dark:text-white">1 Month</p>
                  </div>
                  <p className="dark:text-white">
                    ${operatingSystem === "windows" ? 80 : 60}
                  </p>
                </div>
                <hr className="my-2.5" />
                <div className="flex justify-end">
                  <div className="w-full md:w-fit min-w-80">
                    <div className="flex justify-between">
                      <p className="font-medium dark:text-white">Subtotal</p>
                      <p className="dark:text-white">
                        {(
                          (operatingSystem === "windows" ? 80 : 60) / solPrice
                        ).toFixed(4)}{" "}
                        SOL
                      </p>
                      {/* <p className="dark:text-white">2.12 SOL</p> */}
                    </div>
                    <hr className="my-2.5" />
                    <div className="flex justify-between">
                      <p className="font-medium dark:text-white">Total</p>
                      <p className="dark:text-white">
                        {(
                          (operatingSystem === "windows" ? 80 : 60) / solPrice
                        ).toFixed(4)}{" "}
                        SOL
                      </p>
                      {/* <p className="dark:text-white">2.12 SOL</p> */}
                    </div>
                    <hr className="my-2.5" />
                    <div className="flex gap-2.5">
                      {/* <input
                    className="border border-gray-400 rounded-md h-[40px] px-2.5 w-full text-sm"
                    placeholder="Discount Code"
                  /> */}
                      {/* <button
                        className={` mw-8:mt-3 w-32 sm:w-36 h-10 bg-darkPrimary text-sm sm:text-base font-inter text-[#231F20] font-medium rounded-full cursor-pointer hover:bg-white transition duration-300`}
                      >
                        Apply
                      </button> */}
                    </div>
                    <p className="text-sm text-red-500 h-4"></p>
                  </div>
                </div>

                {status && <p className="text-red-700">{status}</p}
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
    </div>
  );
};

export default BuyScreen;
