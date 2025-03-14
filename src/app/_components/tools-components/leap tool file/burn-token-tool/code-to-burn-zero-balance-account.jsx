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

      // Process the response and filter out accounts with balance
      const accounts = response.value.map(item => {
        const accountInfo = item.account.data.parsed.info;
        const mint = new PublicKey(accountInfo.mint);
        const tokenAccount = new PublicKey(item.pubkey);
        const balance = accountInfo.tokenAmount.uiAmount;
        const decimals = accountInfo.tokenAmount.decimals;
        
        return {
          mint,
          tokenAccount,
          balance,
          decimals,
          symbol: "Unknown", // You could fetch token metadata here if needed
          canBurn: balance === 0
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

  // Burn selected tokens (close token accounts)
  const burnSelectedTokens = async () => {
    if (!primaryWallet?.address || selectedTokens.length === 0) {
      setStatus("Please connect your wallet and select tokens to burn");
      return;
    }

    setLoading(true);
    setStatus("Burning selected tokens...");

    try {
      const publicKey = new PublicKey(primaryWallet.address);
      const signer = await primaryWallet.getSigner();
      
      // Create a transaction to close all selected token accounts
      const transaction = new Transaction();
      
      for (const tokenAccountAddress of selectedTokens) {
        const tokenAccount = tokenAccounts.find(
          account => account.tokenAccount.toString() === tokenAccountAddress
        );
        
        if (tokenAccount && tokenAccount.canBurn) {
          transaction.add(
            createCloseAccountInstruction(
              tokenAccount.tokenAccount,
              publicKey, // Destination for reclaimed rent
              publicKey, // Authority
              []
            )
          );
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
          setStatus(`Successfully burned ${transaction.instructions.length} token accounts! Signature: ${signature}`);
          
          // Refresh token accounts after burning
          await fetchTokenAccounts();
          setSelectedTokens([]);
        } catch (error) {
          console.error("Error burning tokens:", error);
          setStatus("Error: " + (error.message || "Failed to burn tokens"));
        }
      } else {
        setStatus("No eligible token accounts to burn");
      }
    } catch (error) {
      console.error("Error burning tokens:", error);
      setStatus("Error: " + (error.message || "Failed to burn tokens"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sol Token Burner</h2>

      {primaryWallet?.address ? (
        <>
          <p className="mb-4">
            This tool allows you to burn unwanted tokens and reclaim the rent.
          </p>

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
                {tokenAccounts.map((account) => (
                  <div 
                    key={account.tokenAccount.toString()}
                    className="flex items-center justify-between p-2 border-b"
                  >
                    <div>
                      <div className="text-sm font-medium truncate w-40">
                        {account.mint.toString().slice(0, 8)}...
                      </div>
                      <div className="text-xs text-gray-500">
                        Balance: {account.balance}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      disabled={!account.canBurn}
                      checked={selectedTokens.includes(account.tokenAccount.toString())}
                      onChange={() => toggleTokenSelection(account.tokenAccount.toString())}
                      className="ml-2"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Note: Only accounts with zero balance can be burned.
              </div>
            </div>
          )}

          {selectedTokens.length > 0 && (
            <button
              onClick={burnSelectedTokens}
              disabled={loading}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300"
            >
              {loading ? "Burning..." : `Burn ${selectedTokens.length} Selected Tokens`}
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