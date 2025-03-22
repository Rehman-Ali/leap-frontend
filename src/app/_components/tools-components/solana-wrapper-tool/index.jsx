"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { FaWallet } from "react-icons/fa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
  createSyncNativeInstruction
} from "@solana/spl-token";
import { SOL_RPC_URL, X_API_KEY } from "@/utils/server";
import { ToastContainer, toast } from "react-toastify";

// WSOL token mint address on mainnet
const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

// RPC URL - you might want to move this to an environment variable
const SOLANA_RPC_URL = SOL_RPC_URL;
// const SOLANA_RPC_URL = SOL_RPC_URL;

const SolanaWrapperScreen = () => {
  const { primaryWallet, handleLogOut, setShowAuthFlow } = useDynamicContext();
  const [toggle, setToggle] = useState(false);
  const [solPrice, setSolPrice] = useState(null); // Current SOL price in USD

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState({ sol: 0, wsol: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("wrap");
  const [wsolAccount, setWsolAccount] = useState(null);

  // Create connection
  // const connection = new Connection(SOLANA_RPC_URL);
  const connection = new Connection(SOLANA_RPC_URL, {
    httpHeaders: {
      "X-API-KEY": "leap-node"
    }
  });

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
        console.error("Error fetching Solana price:", error);
      }
    }

    fetchSolPrice();
  }, []);

  useEffect(() => {
    if (primaryWallet?.address) {
      fetchBalances();
    }
  }, [primaryWallet?.address]);

  const fetchBalances = async () => {
    if (!primaryWallet?.address) return;

    try {
      const publicKey = new PublicKey(primaryWallet.address);

      // Get SOL balance
      const solBalance = await connection.getBalance(publicKey);

      // Get wSOL token account
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { mint: WRAPPED_SOL_MINT }
        );

        let wsolBalance = 0;
        let wsolAcct = null;

        if (tokenAccounts.value.length > 0) {
          wsolBalance =
            tokenAccounts.value[0].account.data.parsed.info.tokenAmount
              .uiAmount;
          wsolAcct = tokenAccounts.value[0].pubkey;
          setWsolAccount(wsolAcct);
        } else {
          // Calculate the associated token address even if it doesn't exist yet
          const associatedTokenAddress = await getAssociatedTokenAddress(
            WRAPPED_SOL_MINT,
            publicKey
          );
          setWsolAccount(associatedTokenAddress);
        }

        setBalance({
          sol: solBalance / LAMPORTS_PER_SOL,
          wsol: wsolBalance
        });
      } catch (err) {
        console.error("Error fetching wSOL balance:", err);
        setBalance({
          sol: solBalance / LAMPORTS_PER_SOL,
          wsol: 0
        });
      }
    } catch (err) {
      console.error("Error fetching balances:", err);
      toast.error("Failed to fetch balances");
      // setError("Failed to fetch balances");
    }
  };

  const handleWrapSol = async () => {
    if (!primaryWallet?.address || !amount || isNaN(parseFloat(amount))) {
      // setError("Please enter a valid amount");
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      const publicKey = new PublicKey(primaryWallet.address);

      // Check if the user has a wSOL account
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: WRAPPED_SOL_MINT }
      );

      let wsolTokenAccount;
      let transaction = new Transaction();

      if (tokenAccounts.value.length === 0) {
        // No existing wSOL account, we need to create one
        // Get the associated token address
        const associatedTokenAddress = await getAssociatedTokenAddress(
          WRAPPED_SOL_MINT,
          publicKey
        );

        // Add instruction to create the associated token account if it doesn't exist
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey, // payer
            associatedTokenAddress, // associated token account address
            publicKey, // owner
            WRAPPED_SOL_MINT // token mint
          )
        );

        wsolTokenAccount = associatedTokenAddress;
      } else {
        wsolTokenAccount = new PublicKey(tokenAccounts.value[0].pubkey);
      }

      // Add instructions to transfer SOL and sync native instruction
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: wsolTokenAccount,
          lamports: amountLamports
        }),
        createSyncNativeInstruction(wsolTokenAccount)
      );

      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Sign and send transaction
      // const { signature } = await primaryWallet.wallet.signAndSendTransaction(transaction);

      //  // Wait for confirmation
      //  await connection.confirmTransaction(signature);
      const signer = await primaryWallet.getSigner();

      await signer
        .signAndSendTransaction(transaction)
        .then((value) => {
          toast.success(`Successfully wrapped ${amount} SOL to wSOL!`);
          setAmount(0);
          fetchBalances();
        })
        .catch((error) => {
          // setError(error || "Failed to wrapper SOL");
          toast.error(error || "Failed to wrap SOL");
        });
    } catch (err) {
      console.error("Error wrapping SOL:", err);
      // setError(err.message || "Failed to wrap SOL");
      toast.error(error || "Failed to wrap SOL");
    } finally {
      setLoading(false);
    }
  };

  const handleUnwrapSol = async () => {
    if (!primaryWallet?.address || !amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount");
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      const publicKey = new PublicKey(primaryWallet.address);

      // Find wSOL token account
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: WRAPPED_SOL_MINT }
      );

      if (tokenAccounts.value.length === 0) {
        // setError("No wSOL token account found");
        toast.error("No wSOL token account found");
        setLoading(false);
        return;
      }

      const wsolTokenAccountInfo = tokenAccounts.value[0];
      const wsolTokenAccount = new PublicKey(wsolTokenAccountInfo.pubkey);
      const wsolBalance =
        wsolTokenAccountInfo.account.data.parsed.info.tokenAmount.amount;

      // Create the transaction
      const transaction = new Transaction();

      if (parseFloat(amount) * LAMPORTS_PER_SOL >= parseFloat(wsolBalance)) {
        // If we're unwrapping all or more than available, close the account
        transaction.add(
          createCloseAccountInstruction(
            wsolTokenAccount, // token account to close
            publicKey, // destination
            publicKey, // authority
            [] // multisig signers (none in this case)
          )
        );
      } else {
        // Token account doesn't have a direct unwrap instruction, so we can't partially unwrap
        // setError(
        //   "Partial unwrapping is not supported. Please unwrap all your wSOL."
        // );
        toast.error(
          "Partial unwrapping is not supported. Please unwrap all your wSOL."
        );

        setLoading(false);
        return;
      }

      // Get the latest blockhash - THIS WAS MISSING
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Sign and send transaction using the signer
      const signer = await primaryWallet.getSigner();

      await signer
        .signAndSendTransaction(transaction)
        .then((value) => {
          // console.log(
          //   `Transaction successful: https://solscan.io/tx/${value.signature}?cluster=${cluster}`
          // );
          // setSuccess(`Successfully unwrapped all wSOL to SOL!`);
          toast.success(`Successfully unwrapped all wSOL to SOL!`);
          setAmount(0);
          fetchBalances();
        })
        .catch((error) => {
          console.error("Error unwrapping wSOL:", error);
          // setError(error.message || "Failed to unwrap wSOL");
          toast.error(error.message || "Failed to unwrap wSOL");
        });
    } catch (err) {
      console.error("Error unwrapping wSOL:", err);
      // setError(err.message || "Failed to unwrap wSOL");
      toast.error(error.message || "Failed to unwrap wSOL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bodycolor max-w-[1200px] mx-auto">
      <div className="flex flex-col items-center justify-center mt-[50px]">
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
                    className="border-none bg-[#1d1d1d] outline-none max-w-[350px] font-medium text-[25px] mw-9:text-[16px]"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.001"
                    required
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
                    <p className="text-[16px] mw-9:text-[12px] font-inter text-[#a5a5a5] font-normal  ">
                      {balance.sol.toFixed(4)} SOL
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <FaWallet size={13} color="#a5a5a5" />
                    <p className="text-[16px] mw-9:text-[12px] font-inter text-[#a5a5a5] font-normal  ">
                      ${(balance.sol * solPrice).toFixed(2)}
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      setAmount(
                        Math.max(0, (balance.sol - 0.01) / 2).toString()
                      )
                    }
                    className="text-[16px] mw-9:text-[14px] cursor-pointer font-inter text-white font-normal bg-black px-2 py-1 rounded-[8px] hover:bg-darkPrimary"
                  >
                    50%
                  </div>
                  <div
                    onClick={() =>
                      setAmount(Math.max(0, balance.sol - 0.01).toString())
                    }
                    className="text-[16px] mw-9:text-[14px] font-inter text-white font-normal bg-black px-2 py-1 rounded-[8px] cursor-pointer hover:bg-darkPrimary"
                  >
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
                    placeholder="0"
                    className="border-none bg-[#1d1d1d] outline-none max-w-[350px] font-medium text-[25px] mw-9:text-[16px]"
                    value={amount}
                    disabled
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
                    className="border-none bg-[#1d1d1d] outline-none max-w-[350px] font-medium text-[25px] mw-9:text-[16px]"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.001"
                    required
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
                <div className="flex flex-row items-center justify-end  mw-5:gap-x-[10px] gap-x-[30px] mt-[20px]">
                  <div className="flex flex-row items-center gap-1 ">
                    <MdOutlineAccountBalanceWallet size={15} color="#a5a5a5" />
                    <p className="text-[16px] mw-5:text-[12px] font-inter text-[#a5a5a5] font-normal  ">
                      {balance.wsol.toFixed(4)} wSOL
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-1 ">
                    <MdOutlineAccountBalanceWallet size={15} color="#a5a5a5" />
                    <p className="text-[16px] mw-5:text-[12px] font-inter text-[#a5a5a5] font-normal  ">
                      ${(balance.sol * solPrice).toFixed(2)}
                    </p>
                  </div>

                  <div
                    onClick={() => setAmount(balance.wsol.toString())}
                    className="text-[16px] mw-9:text-[14px] font-inter text-white font-normal cursor-pointer hover:bg-darkPrimary bg-black px-2 py-1 rounded-[8px]"
                  >
                    MAX
                  </div>
                </div>
                <p className="text-[12px] pt-[10px] font-inter text-[#a5a5a5] font-normal  ">
                  WSOL can only be unwrapped to SOL in full amount
                </p>
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
                    className="border-none bg-[#1d1d1d] outline-none max-w-[350px] font-medium text-[25px] mw-9:text-[16px]"
                    value={amount}
                    disabled
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
          </div>
        )}
        {!primaryWallet?.address ? (
          <div className=" mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] ">
            <button
              onClick={() => {
                localStorage.setItem("c_path", "/solana-wrapper");
                setShowAuthFlow(true);
              }}
              className="mt-10 w-[100%] px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            <div className="mt-6 text-xs text-[#a5a5a5]">
              <p> 
                Connected wallet: &nbsp;
                <span className="text-darkPrimary">
                {primaryWallet.address.slice(0, 4)}...
                {primaryWallet.address.slice(-4)}
                </span>
               
              </p>
              <p className="mt-1">
                <button
                  onClick={fetchBalances}
                  className="text-blue-500 hover:text-blue-700  mr-2"
                >
                  Refresh balances
                </button>
                <button
                  onClick={handleLogOut}
                  className="text-red-500 hover:text-red-700"
                >
                  Disconnect
                </button>
              </p>
            </div>

            <div className=" mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] ">
              {toggle ? (
                <button
                  onClick={() => handleUnwrapSol()}
                  className="mt-10 w-[100%] px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
                  disabled={loading || !amount || parseFloat(amount) <= 0}
                >
                  {loading ? "Processing..." : "Unwrap wSOL"}
                </button>
              ) : (
                <button
                  onClick={() => handleWrapSol()}
                  disabled={loading || !amount || parseFloat(amount) <= 0}
                  className="mt-10 w-[100%] px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
                >
                  {loading ? "Processing..." : "Wrap SOL"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
    </div>
  );
};

export default SolanaWrapperScreen;
