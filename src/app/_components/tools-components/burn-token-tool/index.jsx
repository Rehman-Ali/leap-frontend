"use client";

import React, { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAccount,
  createCloseAccountInstruction,
  createBurnInstruction,
  getAssociatedTokenAddress
} from "@solana/spl-token";
import { SOL_RPC_URL } from "@/utils/server";
import { ToastContainer, toast } from "react-toastify";

const SOLANA_RPC_URL = SOL_RPC_URL;

const BurnTokenToolScreen = () => {
  const [agree, setAgree] = useState(false);

  const { primaryWallet, handleLogOut, setShowAuthFlow } = useDynamicContext();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenAccounts, setTokenAccounts] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [burnOption, setBurnOption] = useState("emptyOnly"); // "emptyOnly" or "burnAndClose"

  const connection = new Connection(SOLANA_RPC_URL, {
    httpHeaders: {
      "X-API-KEY": "leap-node"
    }
  });

  // Fetch all token accounts owned by the user
  const fetchTokenAccounts = async () => {
    if (!primaryWallet?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    // toast.info("Fetching token accounts...");

    try {
      const publicKey = new PublicKey(primaryWallet.address);

      // Get all token accounts owned by the user
      const response = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );

      // Process the response
      const accounts = response.value.map((item) => {
        const accountInfo = item.account.data.parsed.info;
        const mint = new PublicKey(accountInfo.mint);
        const tokenAccount = new PublicKey(item.pubkey);
        const balance = accountInfo.tokenAmount.uiAmount;
        const rawBalance = BigInt(accountInfo.tokenAmount.amount);
        const decimals = accountInfo.tokenAmount.decimals;

        return {
          mint,
          tokenAccount,
          balance,
          rawBalance,
          decimals,
          symbol: "Unknown", // You could fetch token metadata here if needed
          canClose: balance === 0,
          canBurn: balance > 0
        };
      });

      setTokenAccounts(accounts);
      toast.success(`Found ${accounts.length} token accounts`);
    } catch (error) {
      console.error("Error fetching token accounts:", error);
      toast.error(
        "Error: " + (error.message || "Failed to fetch token accounts")
      );
    } finally {
      setLoading(false);
    }
  };

  // Toggle selection of a token account
  const toggleTokenSelection = (tokenAccountAddress) => {
    setSelectedTokens((prev) => {
      if (prev.includes(tokenAccountAddress)) {
        return prev.filter((addr) => addr !== tokenAccountAddress);
      } else {
        return [...prev, tokenAccountAddress];
      }
    });
  };

  // Process selected tokens based on the burn option
  const processSelectedTokens = async () => {
    if (!primaryWallet?.address || selectedTokens.length === 0) {
      toast.error("Please connect your wallet and select tokens to process");
      return;
    }

    setLoading(true);
    toast.info(
      `Processing selected tokens (${
        burnOption === "emptyOnly"
          ? "closing empty accounts"
          : "burning tokens and closing accounts"
      })...`
    );

    try {
      const publicKey = new PublicKey(primaryWallet.address);
      const signer = await primaryWallet.getSigner();

      // Create a transaction
      const transaction = new Transaction();
      let burnCount = 0;
      let closeCount = 0;

      for (const tokenAccountAddress of selectedTokens) {
        const tokenAccount = tokenAccounts.find(
          (account) => account.tokenAccount.toString() === tokenAccountAddress
        );

        if (!tokenAccount) continue;

        // If burning is enabled and the account has tokens
        if (burnOption === "burnAndClose" && tokenAccount.canBurn) {
          // First burn all tokens
          transaction.add(
            createBurnInstruction(
              tokenAccount.tokenAccount, // Token account
              tokenAccount.mint, // Mint address
              publicKey, // Owner
              tokenAccount.rawBalance, // Amount to burn (all)
              [] // Multisig signers (empty array for single authority)
            )
          );
          burnCount++;

          // Then close the account
          transaction.add(
            createCloseAccountInstruction(
              tokenAccount.tokenAccount, // Token account
              publicKey, // Destination for reclaimed rent
              publicKey, // Authority
              [] // Multisig signers (empty array for single authority)
            )
          );
          closeCount++;
        }
        // If we're only closing empty accounts and the account is empty
        else if (tokenAccount.canClose) {
          transaction.add(
            createCloseAccountInstruction(
              tokenAccount.tokenAccount,
              publicKey,
              publicKey,
              []
            )
          );
          closeCount++;
        }
      }

      // Only proceed if we have instructions to execute
      if (transaction.instructions.length > 0) {
        // Get the latest blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;

        // Sign and send the transaction
        try {
          const signature = await signer.signAndSendTransaction(transaction);
          let successMessage = "";

          if (burnCount > 0) {
            successMessage += `Burned tokens from ${burnCount} accounts! `;
          }
          if (closeCount > 0) {
            successMessage += `Closed ${closeCount} token accounts! `;
          }

          toast.success(`Success! ${successMessage} `);
          // toast.success(`Success! ${successMessage}Signature: ${signature}`);

          // Refresh token accounts after processing
          await fetchTokenAccounts();
          setSelectedTokens([]);
        } catch (error) {
          console.error("Error processing tokens:", error);
          toast.error(
            "Error: " + (error.message || "Failed to process tokens")
          );
        }
      } else {
        toast.error("No eligible token accounts to process");
      }
    } catch (error) {
      console.error("Error processing tokens:", error);
      toast.error("Error: " + (error.message || "Failed to process tokens"));
    } finally {
      setLoading(false);
    }
  };

  // Get the eligible accounts based on current burn option
  const getEligibleAccounts = () => {
    if (burnOption === "emptyOnly") {
      return tokenAccounts.filter((account) => account.canClose);
    } else {
      return tokenAccounts; // All accounts are eligible when burning is enabled
    }
  };

  const eligibleAccounts = getEligibleAccounts();

  // Render wallet connection prompt if not connected
  if (!primaryWallet?.address) {
    return (
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/home/hero-section/bg.png')" }}
      >
        <div className="flex items-center justify-center min-h-screen ">
          {!agree ? (
            <div className="flex flex-col items-center justify-center mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[600px] bg-[#1d1d1d] p-5 rounded-[12px]">
              <h1 className="text-[32px] mw-7:text-[24px] text-center font-inter text-darkPrimary font-medium">
              Burn Token Tool
              </h1>

              <p className="py-[10px] text-[16px] mw-7:text-[14px] font-inter text-white font-normal">
                The Burn Token tool is used to facilitate the irreversible
                burning of your tokens.
              </p>
              <p className="py-[10px] text-[16px] mw-7:text-[14px]  font-inter text-white font-normal">
                By using this tool, you are doing so at your own risk. The Burn
                Token tool is not responsible for any tokens burned as a result
                of its usage.
              </p>
              <p className="py-[10px] text-[16px] mw-7:text-[14px] font-inter text-white font-normal">
                By using the tool you explicitly accept full responsibility for
                any and all burns.
              </p>
              <p className="py-[10px] text-[16px] mw-7:text-[14px]  font-inter text-white font-normal">
                The Burn Token tool additionally does not assume liability for
                any mistakes, accidents, miss-intentions or any other actions
                that led to an undesired burn.
              </p>

              <button
                onClick={() => setAgree(true)}
                className="my-[15px]  px-8 py-3 uppercase bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
              >
                Agree and close
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center bg-[#1d1d1d] p-10 rounded-[12px]">
              <p className="text-[24px] mw-7:text-[18px] text-center font-inter text-white font-normal">
                Connect your wallet to continue
              </p>
              <button
                onClick={() => {
                  localStorage.setItem("c_path", "/burn-token");
                  setShowAuthFlow(true);
                }}
                className="mt-10 px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/home/hero-section/bg.png')" }}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md mx-auto p-4">
          <h2 className="text-[24px] font-inter font-bold mb-4 text-darkPrimary text-center">
            Token Burner
          </h2>

          <>
            <p className="mb-4 font-inter">
              This tool allows you to burn tokens and close token accounts to
              reclaim rent.
            </p>

            <div className="bg-[#1d1d1d] rounded-[12px] w-full  p-4 mb-4">
              <label className="block text-white text-[16px] font-inter font-medium mb-2">
                Choose option:
              </label>
              <div className="flex flex-col space-y-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="emptyOnly"
                    checked={burnOption === "emptyOnly"}
                    onChange={() => setBurnOption("emptyOnly")}
                    className="mr-3"
                  />
                  <span className="font-inter text-white">
                    Close empty accounts only{" "}
                    <span className="text-darkPrimary text-[13px]">
                      (reclaim SOL rent)
                    </span>
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="burnAndClose"
                    checked={burnOption === "burnAndClose"}
                    onChange={() => setBurnOption("burnAndClose")}
                    className="mr-3"
                  />
                  <span className="font-inter text-white">
                    Burn tokens AND close accounts{" "}
                    <span className="text-darkPrimary text-[13px]">
                      (WARNING: tokens will be permanently destroyed)
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={fetchTokenAccounts}
              disabled={loading}
              className="w-[100%] px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
            >
              {loading ? "Loading..." : "Fetch Token Accounts"}
            </button>
            <div className="mt-4">
              {tokenAccounts.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-white text-[14px] font-inter mb-2">
                    Your Token Accounts{" "}
                    <span className="text-darkPrimary">
                      ({tokenAccounts.length})
                    </span>
                  </h3>
                  <div className="max-h-60 overflow-y-auto">
                    {tokenAccounts.map((account) => {
                      const isEligible =
                        burnOption === "burnAndClose" || account.canClose;

                      return (
                        <div
                          key={account.tokenAccount.toString()}
                          className={`flex items-center justify-between mb-[15px] p-4 border rounded-[12px] border-darkPrimary `}
                        >
                          <div>
                            <div className="text-sm font-medium font-inter truncate w-40 text-white">
                              {account.mint.toString().slice(0, 8)}...
                            </div>
                            <div className="text-xs font-inter text-white py-[5px]">
                              Balance:{" "}
                              <span className="text-darkPrimary font-bold">
                                {account.balance}
                              </span>
                            </div>
                            <div className="text-xs mt-[5px]">
                              {account.balance === 0 ? (
                                <span className=" bg-darkPrimary text-xs text-white font-inter border p-1 rounded-[5px] border-green-800">
                                  Can close
                                </span>
                              ) : burnOption === "burnAndClose" ? (
                                <span className=" bg-orange-500 text-xs text-white font-inter border p-1 rounded-[5px] border-orange-500">
                                  Will burn tokens
                                </span>
                              ) : (
                                <span className=" bg-red-500 text-xs text-white font-inter border p-1 rounded-[5px] border-red-500">
                                  Has balance (can't close)
                                </span>
                              )}
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            disabled={!isEligible}
                            checked={selectedTokens.includes(
                              account.tokenAccount.toString()
                            )}
                            onChange={() =>
                              toggleTokenSelection(
                                account.tokenAccount.toString()
                              )
                            }
                            className="ml-2"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="bg-[#1d1d1d] rounded-[12px] mt-4 p-4 ">
                    <div className="text-sm text-red-500 font-inter">
                      {burnOption === "emptyOnly"
                        ? "Note: Only accounts with zero balance can be closed."
                        : "Warning: This will permanently burn tokens in selected accounts!"}
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium font-inter text-white">
                        Eligible accounts: <span className="text-darkPrimary">{eligibleAccounts.length}</span>  of{" "}
                        {tokenAccounts.length}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {selectedTokens.length > 0 && (
              <button
                onClick={processSelectedTokens}
                disabled={loading}
                className={`w-full px-8 py-3 ${
                  burnOption === "burnAndClose"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-darkPrimary text-black"
                }   disabled:opacity-50 font-inter font-semibold cursor-pointer transition duration-300 rounded-full`}
              >
                {loading
                  ? "Processing..."
                  : burnOption === "burnAndClose"
                  ? `Burn Tokens & Close ${selectedTokens.length} Accounts`
                  : `Close ${selectedTokens.length} Empty Accounts`}
              </button>
            )}
          </>
          <div className="mt-6 text-xs text-white">
            <p className="font-inter">
              Connected wallet:{" "}
              <span className="text-darkPrimary">
                {primaryWallet.address.slice(0, 4)}...
                {primaryWallet.address.slice(-4)}
              </span>
            </p>
            {/* <p className="mt-1">
              <button
               onClick={fetchTokenAccounts}
                className="text-darkPrimary font-inter font-semibold cursor-pointer"
              >
                Refresh Account
              </button>
            </p> */}
            <p className="mt-1">
              <button
                onClick={handleLogOut}
                className="text-red-500 font-inter font-semibold cursor-pointer hover:text-red-700"
              >
                Disconnect
              </button>
            </p>
          </div>
        </div>
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

export default BurnTokenToolScreen;
