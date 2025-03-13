"use client";

import Image from "next/image";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { useState } from "react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createSyncNativeInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import Swal from "sweetalert2";

const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"; // Use your Solana RPC provider

const SolanaWrapperScreen = () => {
  const { setShowAuthFlow } = useDynamicContext();
  const [toggle, setToggle] = useState(false);

  const { primaryWallet } = useDynamicContext(); // Dynamic Labs Wallet
  const [loading, setLoading] = useState(false);
  const connection = new Connection(SOLANA_RPC_URL, "confirmed");

  const WSOL_ADDRESS = new PublicKey(
    "So11111111111111111111111111111111111111112"
  );

  // ✅ Wrap SOL to WSOL
  const wrapSOL = async () => {
    if (!primaryWallet)
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Please connect your wallet",
        showConfirmButton: false,
        timer: 2000
      });
    setLoading(true);

    try {
      const owner = new PublicKey(primaryWallet.address);
      const associatedTokenAccount = await getAssociatedTokenAddress(
        WSOL_ADDRESS,
        owner
      );

      const transaction = new Transaction();

      // Create Associated Token Account if it doesn’t exist
      transaction.add(
        createAssociatedTokenAccountInstruction(
          owner, // Payer
          associatedTokenAccount, // Associated Token Account
          owner, // Owner
          WSOL_ADDRESS // WSOL Token Address
        )
      );

      // Transfer SOL to WSOL Account
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: owner,
          toPubkey: associatedTokenAccount,
          lamports: 1_000_000_000 // 1 SOL in lamports
        })
      );

      // Sync WSOL balance
      transaction.add(createSyncNativeInstruction(associatedTokenAccount));

      const signedTransaction = await primaryWallet.signTransaction(
        transaction
      );
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature, "confirmed");

      alert(`Wrapped SOL Successfully! Tx: ${signature}`);
    } catch (error) {
      console.error("Error wrapping SOL:", error);
      alert("Failed to wrap SOL");
    }

    setLoading(false);
  };

  // ✅ Unwrap WSOL to SOL
  const unwrapSOL = async () => {
    if (!primaryWallet) return alert("Please connect your wallet");
    setLoading(true);

    try {
      const owner = new PublicKey(primaryWallet.address);
      const associatedTokenAccount = await getAssociatedTokenAddress(
        WSOL_ADDRESS,
        owner
      );

      const transaction = new Transaction();

      // Close WSOL account to get back SOL
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: associatedTokenAccount,
          toPubkey: owner,
          lamports: 0 // Withdraw all WSOL as SOL
        })
      );

      const signedTransaction = await primaryWallet.signTransaction(
        transaction
      );
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );
      await connection.confirmTransaction(signature, "confirmed");

      alert(`Unwrapped WSOL Successfully! Tx: ${signature}`);
    } catch (error) {
      console.error("Error unwrapping WSOL:", error);
      alert("Failed to unwrap WSOL");
    }

    setLoading(false);
  };

  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[45px] mw-7:text-[28px] text-center font-inter text-darkPrimary font-bold">
          Solana Wrapper
        </h1>
        <p className="text-[18px] mw-7:text-[16px] text-center font-inter text-white font-medium">
          Easily wrap or unwrap Solana without Coding.
        </p>
        {!toggle ? (
          <div className="mt-[50px] flex flex-col items-center">
            <div className="bg-[#1d1d1d] rounded-[12px] mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] p-4 ">
              <div className="mb-[15px] pb-[15px] border-b border-b-[#ffffff29] font-inter text-[#a5a5a5]">
                <p>You Wrap</p>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between px-[10px]">
                  <input
                    type="number"
                    className="border-none bg-[#1d1d1d] outline-none w-[150px] font-medium text-[25px]"
                    defaultValue={1}
                  />
                  <div className="flex flex-row items-center gap-2 border-[2px] border-[#ffffff29] px-3 py-2  rounded-[15px]">
                    <Image
                      src="/assets/sol.webp"
                      alt="sol icon"
                      width={100}
                      height={100}
                      className="h-[16px] w-[16px] "
                    />
                    <p className="text-[16px] font-inter text-darkPrimary font-medium">
                      SOL
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end gap-x-[20px] mt-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <MdOutlineAccountBalanceWallet size={15} color="#a5a5a5" />
                    <p className="text-[16px] font-inter text-[#a5a5a5] font-normal  ">
                      0.00
                    </p>
                  </div>
                  <div className="text-[16px] font-inter text-white font-normal bg-black px-2 py-1 rounded-[8px]">
                    50%
                  </div>
                  <div className="text-[16px] font-inter text-white font-normal bg-black px-2 py-1 rounded-[8px]">
                    MAX
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => setToggle(!toggle)}
              className="bg-[#2d2d2d] w-[50px] my-[-10px] z-10  h-[50px] rounded-full flex items-center justify-center"
            >
              <LuArrowUpDown size={26} color="#37F94E" />
            </div>
            <div className="bg-[#1d1d1d] rounded-[12px] mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] p-4 ">
              <div className="mb-[15px] pb-[15px] border-b border-b-[#ffffff29] font-inter text-[#a5a5a5]">
                <p>You Recieved</p>
              </div>
              <div className="mb-[20px]">
                <div className="flex flex-row items-center justify-between px-[10px]">
                  <input
                    type="number"
                    className="border-none bg-[#1d1d1d] outline-none w-[150px] font-medium text-[25px]"
                    defaultValue={1}
                  />
                  <div className="flex flex-row items-center gap-2 border-[2px] border-[#ffffff29] px-3 py-2  rounded-[15px]">
                    <Image
                      src="/assets/sol.webp"
                      alt="sol icon"
                      width={100}
                      height={100}
                      className="h-[16px] w-[16px] "
                    />
                    <p className="text-[16px] font-inter text-darkPrimary font-medium">
                      WSOL
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={wrapSOL}
              disabled={loading}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
            >
              {loading ? "Wrapping..." : "Wrap SOL to WSOL"}
            </button>
          </div>
        ) : (
          <div className="mt-[50px] flex flex-col items-center">
            <div className="bg-[#1d1d1d] rounded-[12px] mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] p-4 ">
              <div className="mb-[15px] pb-[15px] border-b border-b-[#ffffff29] font-inter text-[#a5a5a5]">
                <p>You Unwrap</p>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between px-[10px]">
                  <input
                    type="number"
                    className="border-none bg-[#1d1d1d] outline-none w-[150px] font-medium text-[25px]"
                    defaultValue={0}
                  />
                  <div className="flex flex-row items-center gap-2 border-[2px] border-[#ffffff29] px-3 py-2  rounded-[15px]">
                    <Image
                      src="/assets/sol.webp"
                      alt="sol icon"
                      width={100}
                      height={100}
                      className="h-[16px] w-[16px] "
                    />
                    <p className="text-[16px] font-inter text-darkPrimary font-medium">
                      WSOL
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-x-[20px] mt-[20px]">
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-[16px] font-inter text-[#a5a5a5] font-normal  ">
                      WSOL can only be unwrapped to SOL in full amount
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => setToggle(!toggle)}
              className="bg-[#2d2d2d] w-[50px] my-[-10px] z-10  h-[50px] rounded-full flex items-center justify-center"
            >
              <LuArrowUpDown size={26} color="#37F94E" />
            </div>
            <div className="bg-[#1d1d1d] rounded-[12px] mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] p-4 ">
              <div className="mb-[15px] pb-[15px] border-b border-b-[#ffffff29] font-inter text-[#a5a5a5]">
                <p>You Recieved</p>
              </div>
              <div className="mb-[20px]">
                <div className="flex flex-row items-center justify-between px-[10px]">
                  <input
                    type="number"
                    className="border-none bg-[#1d1d1d] outline-none w-[150px] font-medium text-[25px]"
                    defaultValue={0}
                  />
                  <div className="flex flex-row items-center gap-2 border-[2px] border-[#ffffff29] px-3 py-2  rounded-[15px]">
                    <Image
                      src="/assets/sol.webp"
                      alt="sol icon"
                      width={100}
                      height={100}
                      className="h-[16px] w-[16px] "
                    />
                    <p className="text-[16px] font-inter text-darkPrimary font-medium">
                      SOL
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={unwrapSOL}
              disabled={loading}
              className="bg-red-600 px-4 py-2 rounded mt-4 hover:bg-red-700 transition"
            >
              {loading ? "Unwrapping..." : "Unwrap WSOL to SOL"}
            </button>
          </div>
        )}
        <div className=" mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] ">
          <button
            onClick={() => setShowAuthFlow(true)}
            className="mt-10 w-[100%] px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolanaWrapperScreen;
