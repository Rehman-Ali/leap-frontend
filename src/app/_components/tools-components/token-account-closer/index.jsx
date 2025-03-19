

"use client";

import React, { useState, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Connection,
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createCloseAccountInstruction
} from '@solana/spl-token';
import { SOL_RPC_URL } from "@/utils/server";
import { ToastContainer, toast } from "react-toastify";

// RPC URL - you might want to move this to an environment variable
const SOLANA_RPC_URL = SOL_RPC_URL;

const VaporToolScreen = () => {
 const { primaryWallet, handleLogOut, setShowAuthFlow } = useDynamicContext();
   const [tokenAccounts, setTokenAccounts] = useState([]);
   const [selectedAccounts, setSelectedAccounts] = useState({});
   const [loading, setLoading] = useState(false);
   const [fetchingAccounts, setFetchingAccounts] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [solBalance, setSolBalance] = useState(0);
   const [potentialRefund, setPotentialRefund] = useState(0);
 
   // Create connection
   const connection = new Connection(SOLANA_RPC_URL);
 
   // Fetch token accounts on wallet connection or refresh
   useEffect(() => {
     if (primaryWallet?.address) {
       fetchTokenAccounts();
     }
   }, [primaryWallet?.address]);
 
   // Fetch all token accounts and identify unused ones
   const fetchTokenAccounts = async () => {
     if (!primaryWallet?.address) return;
 
     setFetchingAccounts(true);
     setError("");
     setSuccess("");
     setTokenAccounts([]);
     setSelectedAccounts({});
 
     try {
       const publicKey = new PublicKey(primaryWallet.address);
       
       // Get SOL balance
       const balance = await connection.getBalance(publicKey);
       setSolBalance(balance / LAMPORTS_PER_SOL);
       
       // Get all token accounts owned by this wallet
       const accounts = await connection.getParsedTokenAccountsByOwner(
         publicKey,
         { programId: TOKEN_PROGRAM_ID }
       );
       
       // Process accounts to identify empty ones (0 balance)
       const processedAccounts = accounts.value.map(account => {
         const parsedInfo = account.account.data.parsed.info;
         const mint = parsedInfo.mint;
         const balance = parsedInfo.tokenAmount.uiAmount;
         const accountPubkey = account.pubkey.toString();
         
         // Get token metadata if available (This is simplified - in a complete implementation 
         // you might want to fetch token metadata for better display)
         let tokenSymbol = "Unknown Token";
         let tokenName = mint.slice(0, 4) + "..." + mint.slice(-4);
         
         return {
           pubkey: accountPubkey,
           mint,
           balance,
           tokenSymbol,
           tokenName,
           isCloseable: balance === 0, // Token accounts with 0 balance can be closed
           rentExemptLamports: account.account.lamports // Amount of SOL locked in this account
         };
       });
       
       // Sort by closeable first, then by balance
       processedAccounts.sort((a, b) => {
         if (a.isCloseable !== b.isCloseable) {
           return a.isCloseable ? -1 : 1;
         }
         return a.balance - b.balance;
       });
       
       setTokenAccounts(processedAccounts);
       
       // Calculate potential refund from all closeable accounts
       const refund = processedAccounts
         .filter(account => account.isCloseable)
         .reduce((total, account) => total + account.rentExemptLamports, 0) / LAMPORTS_PER_SOL;
       
       setPotentialRefund(refund);
     } catch (err) {
       console.error("Error fetching token accounts:", err);
       toast.error("Failed to fetch token accounts: " + (err.message || "Unknown error"));
     } finally {
       setFetchingAccounts(false);
     }
   };
 
   // Toggle account selection
   const toggleAccountSelection = (pubkey) => {
     setSelectedAccounts(prev => ({
       ...prev,
       [pubkey]: !prev[pubkey]
     }));
   };
 
   // Select all closeable accounts
   const selectAllCloseable = () => {
     const newSelection = {};
     tokenAccounts.forEach(account => {
       if (account.isCloseable) {
         newSelection[account.pubkey] = true;
       }
     });
     setSelectedAccounts(newSelection);
   };
 
   // Clear all selections
   const clearSelection = () => {
     setSelectedAccounts({});
   };
 
   // Close selected token accounts
   const closeSelectedAccounts = async () => {
     const selectedKeys = Object.keys(selectedAccounts).filter(key => selectedAccounts[key]);
     
     if (selectedKeys.length === 0) {
       toast.error("No accounts selected for closing");
       return;
     }
     
     setLoading(true);
     setError("");
     setSuccess("");
     
     try {
       const publicKey = new PublicKey(primaryWallet.address);
       const transaction = new Transaction();
       
       // Add close instruction for each selected account
       for (const accountKey of selectedKeys) {
         // Find the account in our list
         const account = tokenAccounts.find(acc => acc.pubkey === accountKey);
         
         if (account && account.isCloseable) {
           transaction.add(
             createCloseAccountInstruction(
               new PublicKey(account.pubkey), // Token account to close
               publicKey, // Destination for rent funds
               publicKey, // Authority
               [] // Multisig signers (empty in this case)
             )
           );
         }
       }
       
       if (transaction.instructions.length === 0) {
         throw new Error("No closeable accounts were selected");
       }
       
       // Get the latest blockhash
       const { blockhash } = await connection.getLatestBlockhash();
       transaction.recentBlockhash = blockhash;
       transaction.feePayer = publicKey;
       
       // Sign and send transaction
       const signer = await primaryWallet.getSigner();
       
       const txResult = await signer.signAndSendTransaction(transaction);
      //  console.log(`Transaction successful: https://solscan.io/tx/${txResult.signature}?cluster=${cluster}`);
       
       // Calculate refunded SOL
       const closedAccounts = tokenAccounts.filter(acc => selectedAccounts[acc.pubkey]);
       const refundAmount = closedAccounts.reduce((total, acc) => total + acc.rentExemptLamports, 0) / LAMPORTS_PER_SOL;
       
       toast.success(`Successfully closed ${closedAccounts.length} account(s) and recovered approximately ${refundAmount.toFixed(6)} SOL`);
       
       // Refresh accounts after closing
       fetchTokenAccounts();
     } catch (err) {
       console.error("Error closing accounts:", err);
       toast.error("Failed to close accounts: " + (err.message || "Unknown error"));
     } finally {
       setLoading(false);
     }
   };
 

 // Render wallet connection prompt if not connected
 if (!primaryWallet?.address) {
  return (
    <div
    className="min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/assets/home/hero-section/bg.png')" }}
  >
    <div className="flex items-center justify-center min-h-screen  ">
      <div className="flex flex-col items-center justify-center mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[600px]">
        <h1 className="text-[45px] mw-7:text-[28px] text-center font-inter text-darkPrimary font-bold">
          Token Account Closer
        </h1>
        <p className="text-[18px] mw-7:text-[16px] text-center font-inter text-white font-medium">
          powered by Leap
        </p>
        <p className="py-[20px] text-[16px] mw-7:text-[14px] text-center font-inter text-white font-normal">
          Token Account Closer is a tool to close unused token accounts in your wallet. By
          closing these accounts, you will be refunded the SOL used to create
          them, which is 0.00204 SOL per account.
        </p>
        <button
          onClick={() => {
            localStorage.setItem("c_path", "/token-account-closer")
            setShowAuthFlow(true)}}
          className="mt-10 px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  </div>
  );
}



  return (
    <div
      className="min-h-screen bg-cover bg-center  py-[100px] mw-7:py-[50px]"
      style={{ backgroundImage: "url('/assets/home/hero-section/bg.png')" }}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="flex flex-col items-center justify-center mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[600px]">
          <h1 className="text-[45px] mw-7:text-[28px] text-center font-inter text-darkPrimary font-bold">
            Token Account Closer
          </h1>
          <p className="text-[18px] mw-7:text-[16px] text-center font-inter text-white font-medium">
            powered by Leap
          </p>
          <p className="py-[20px] text-[16px] mw-7:text-[14px] text-center font-inter text-white font-normal">
            Token Account Closer is a tool to close unused token accounts in your wallet. By
            closing these accounts, you will be refunded the SOL used to create
            them, which is 0.00204 SOL per account.
          </p>
         <div className="w-full max-w-md mx-auto p-4">
              
              
              <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-black font-inter">SOL Balance:</span>
                  <span className="font-medium text-black font-inter">{solBalance.toFixed(6)} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-inter">Potential Refund:</span>
                  <span className="font-medium text-black font-inter">{potentialRefund.toFixed(6)} SOL</span>
                </div>
              </div>
              
              <div className="my-4 flex space-x-2">
                <button
                  onClick={fetchTokenAccounts}
                  className="mw-4:px-3 px-4 py-2 text-black bg-gray-200 font-inter rounded-md hover:bg-gray-300 transition duration-300"
                  disabled={fetchingAccounts}
                >
                  {fetchingAccounts ? "Loading..." : "Refresh Accounts"}
                </button>
                <button
                  onClick={selectAllCloseable}
                  className="mw-4:px-3 px-4 py-2 bg-blue-100 text-black font-inter rounded-md hover:bg-blue-200 transition duration-300"
                  disabled={fetchingAccounts}
                >
                  Select All Closeable
                </button>
                <button
                  onClick={clearSelection}
                  className="mw-4:px-3 px-4 py-2 font-inter bg-gray-200 rounded-md text-black  hover:bg-gray-300 transition duration-300"
                  disabled={fetchingAccounts}
                >
                  Clear Selection
                </button>
              </div>
              
              {/* {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg font-inter">{error}</div>}
              {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg font-inter">{success}</div>}
               */}
              <div className="mt-4">
                <h3 className="font-medium font-inter mb-2">Your Token Accounts ({tokenAccounts.length})</h3>
                
                {fetchingAccounts ? (
                  <div className="text-center font-inter p-4">Loading accounts...</div>
                ) : tokenAccounts.length === 0 ? (
                  <div className="text-center p-4 bg-gray-50 text-black rounded-lg font-inter">No token accounts found</div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    {tokenAccounts.map((account) => (
                      <div 
                        key={account.pubkey}
                        className={`mb-2 p-3 rounded-lg border ${
                          account.isCloseable 
                            ? selectedAccounts[account.pubkey] 
                              ? 'bg-blue-50 border-blue-300' 
                              : 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-black font-inter">{account.tokenName || account.mint.slice(0, 6) + '...'}</div>
                            <div >
                              <p className=" text-black font-inter">{account.pubkey.slice(0, 8)}...{account.pubkey.slice(-8)}</p>
                            </div>
                            <div className="text-sm text-black font-inter">
                              Balance: <span className="font-medium">{account.balance}</span>
                            </div>
                            <div className="text-xs text-black font-inter">
                              Rent: {(account.rentExemptLamports / LAMPORTS_PER_SOL).toFixed(6)} SOL
                            </div>
                          </div>
                          
                          <div>
                            {account.isCloseable ? (
                              <input
                                type="checkbox"
                                checked={!!selectedAccounts[account.pubkey]}
                                onChange={() => toggleAccountSelection(account.pubkey)}
                                className="h-5 w-5 rounded border-black cursor-pointer"
                              />
                            ) : (
                              <span className="text-xs text-red-500 font-inter">Not empty</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <button
                  onClick={closeSelectedAccounts}
                  disabled={loading || Object.keys(selectedAccounts).filter(k => selectedAccounts[k]).length === 0}
                  className={`mt-4 w-full font-inter py-3 px-4 rounded-full font-medium transition duration-300 ${
                    Object.keys(selectedAccounts).filter(k => selectedAccounts[k]).length > 0
                      ? 'bg-darkPrimary  text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? "Processing..." : `Close Selected Accounts (${Object.keys(selectedAccounts).filter(k => selectedAccounts[k]).length})`}
                </button>
              </div>
              
              <div className="mt-6 text-xs text-gray-200">
                <p className="font-inter">
                  Connected wallet: {primaryWallet.address.slice(0, 4)}...
                  {primaryWallet.address.slice(-4)}
                </p>
                <p className="mt-1">
                  <button
                    onClick={handleLogOut}
                    className="text-blue-500 font-inter font-semibold hover:text-blue-700"
                  >
                    Disconnect
                  </button>
                </p>
              </div>
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

export default VaporToolScreen;
