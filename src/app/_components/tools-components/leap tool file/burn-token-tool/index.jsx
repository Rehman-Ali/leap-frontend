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

const SOLANA_RPC_URL = "https://api.devnet.solana.com";
// const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

const BurnTokenToolScreen = () => {
  const { primaryWallet } = useDynamicContext();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenAccounts, setTokenAccounts] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [burnOption, setBurnOption] = useState("emptyOnly"); // "emptyOnly" or "burnAndClose"

  const connection = new Connection(SOLANA_RPC_URL);

  // Fetch all token accounts owned by the user
  const fetchTokenAccounts = async () => {
    if (!primaryWallet?.address) {
      setStatus("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setStatus("Fetching token accounts...");

    try {
      const publicKey = new PublicKey(primaryWallet.address);
      
      // Get all token accounts owned by the user
      const response = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );

      // Process the response
      const accounts = response.value.map(item => {
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
      setStatus(`Found ${accounts.length} token accounts`);
    } catch (error) {
      console.error("Error fetching token accounts:", error);
      setStatus("Error: " + (error.message || "Failed to fetch token accounts"));
    } finally {
      setLoading(false);
    }
  };

  // Toggle selection of a token account
  const toggleTokenSelection = (tokenAccountAddress) => {
    setSelectedTokens(prev => {
      if (prev.includes(tokenAccountAddress)) {
        return prev.filter(addr => addr !== tokenAccountAddress);
      } else {
        return [...prev, tokenAccountAddress];
      }
    });
  };

  // Process selected tokens based on the burn option
  const processSelectedTokens = async () => {
    if (!primaryWallet?.address || selectedTokens.length === 0) {
      setStatus("Please connect your wallet and select tokens to process");
      return;
    }

    setLoading(true);
    setStatus(`Processing selected tokens (${burnOption === "emptyOnly" ? "closing empty accounts" : "burning tokens and closing accounts"})...`);

    try {
      const publicKey = new PublicKey(primaryWallet.address);
      const signer = await primaryWallet.getSigner();
      
      // Create a transaction
      const transaction = new Transaction();
      let burnCount = 0;
      let closeCount = 0;
      
      for (const tokenAccountAddress of selectedTokens) {
        const tokenAccount = tokenAccounts.find(
          account => account.tokenAccount.toString() === tokenAccountAddress
        );
        
        if (!tokenAccount) continue;
        
        // If burning is enabled and the account has tokens
        if (burnOption === "burnAndClose" && tokenAccount.canBurn) {
          // First burn all tokens
          transaction.add(
            createBurnInstruction(
              tokenAccount.tokenAccount,   // Token account
              tokenAccount.mint,           // Mint address
              publicKey,                   // Owner
              tokenAccount.rawBalance,     // Amount to burn (all)
              []                           // Multisig signers (empty array for single authority)
            )
          );
          burnCount++;
          
          // Then close the account
          transaction.add(
            createCloseAccountInstruction(
              tokenAccount.tokenAccount,   // Token account
              publicKey,                   // Destination for reclaimed rent
              publicKey,                   // Authority
              []                           // Multisig signers (empty array for single authority)
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
          
          setStatus(`Success! ${successMessage}Signature: ${signature}`);
          
          // Refresh token accounts after processing
          await fetchTokenAccounts();
          setSelectedTokens([]);
        } catch (error) {
          console.error("Error processing tokens:", error);
          setStatus("Error: " + (error.message || "Failed to process tokens"));
        }
      } else {
        setStatus("No eligible token accounts to process");
      }
    } catch (error) {
      console.error("Error processing tokens:", error);
      setStatus("Error: " + (error.message || "Failed to process tokens"));
    } finally {
      setLoading(false);
    }
  };

  // Get the eligible accounts based on current burn option
  const getEligibleAccounts = () => {
    if (burnOption === "emptyOnly") {
      return tokenAccounts.filter(account => account.canClose);
    } else {
      return tokenAccounts; // All accounts are eligible when burning is enabled
    }
  };
  
  const eligibleAccounts = getEligibleAccounts();

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Advanced Token Burner</h2>

      {primaryWallet?.address ? (
        <>
          <p className="mb-4">
            This tool allows you to burn tokens and close token accounts to reclaim rent.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Choose option:</label>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="emptyOnly"
                  checked={burnOption === "emptyOnly"}
                  onChange={() => setBurnOption("emptyOnly")}
                  className="mr-2"
                />
                <span>Close empty accounts only (reclaim SOL rent)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="burnAndClose"
                  checked={burnOption === "burnAndClose"}
                  onChange={() => setBurnOption("burnAndClose")}
                  className="mr-2"
                />
                <span>Burn tokens AND close accounts (WARNING: tokens will be permanently destroyed)</span>
              </label>
            </div>
          </div>

          <button
            onClick={fetchTokenAccounts}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 mb-4"
          >
            {loading ? "Loading..." : "Fetch Token Accounts"}
          </button>

          {tokenAccounts.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Your Token Accounts</h3>
              <div className="max-h-60 overflow-y-auto">
                {tokenAccounts.map((account) => {
                  const isEligible = burnOption === "burnAndClose" || account.canClose;
                  
                  return (
                    <div 
                      key={account.tokenAccount.toString()}
                      className={`flex items-center justify-between p-2 border-b ${isEligible ? "" : "opacity-50"}`}
                    >
                      <div>
                        <div className="text-sm font-medium truncate w-40">
                          {account.mint.toString().slice(0, 8)}...
                        </div>
                        <div className="text-xs text-gray-500">
                          Balance: {account.balance}
                        </div>
                        <div className="text-xs">
                          {account.balance === 0 ? 
                            <span className="text-green-600">Can close</span> : 
                            (burnOption === "burnAndClose" ? 
                              <span className="text-orange-500">Will burn tokens</span> : 
                              <span className="text-red-500">Has balance (can't close)</span>
                            )
                          }
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        disabled={!isEligible}
                        checked={selectedTokens.includes(account.tokenAccount.toString())}
                        onChange={() => toggleTokenSelection(account.tokenAccount.toString())}
                        className="ml-2"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                {burnOption === "emptyOnly" 
                  ? "Note: Only accounts with zero balance can be closed." 
                  : "Warning: This will permanently burn tokens in selected accounts!"
                }
              </div>
              <div className="mt-2 text-sm">
                <span className="font-medium">Eligible accounts: </span>
                {eligibleAccounts.length} of {tokenAccounts.length}
              </div>
            </div>
          )}

          {selectedTokens.length > 0 && (
            <button
              onClick={processSelectedTokens}
              disabled={loading}
              className={`w-full py-2 px-4 ${burnOption === "burnAndClose" ? "bg-red-600 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-600"} text-white rounded-md disabled:opacity-50`}
            >
              {loading 
                ? "Processing..." 
                : burnOption === "burnAndClose" 
                  ? `Burn Tokens & Close ${selectedTokens.length} Accounts` 
                  : `Close ${selectedTokens.length} Empty Accounts`
              }
            </button>
          )}

          {status && (
            <div className="mt-4 p-3 bg-gray-100 text-black rounded-md whitespace-pre-line">
              {status}
            </div>
          )}
        </>
      ) : (
        <p>Please connect your wallet first</p>
      )}
    </div>
  );
};

export default BurnTokenToolScreen;