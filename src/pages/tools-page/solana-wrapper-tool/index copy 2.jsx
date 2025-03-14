"use client";

import React, { useState, useEffect } from "react";
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
} from '@solana/spl-token';

import { LuArrowUpDown } from "react-icons/lu";
import { SOL_RPC_URL } from "@/utils/server";

// WSOL token mint address on mainnet
const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

// RPC URL - you might want to move this to an environment variable
const SOLANA_RPC_URL = SOL_RPC_URL;
// const SOLANA_RPC_URL = SOL_RPC_URL;

const WrapUnwrapSol = () => {
  const { primaryWallet, handleLogOut, setShowAuthFlow } = useDynamicContext();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState({ sol: 0, wsol: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("wrap");
  const [wsolAccount, setWsolAccount] = useState(null);

  // Create connection
  const connection = new Connection(SOLANA_RPC_URL);

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
        }else{
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
      setError("Failed to fetch balances");
    }
  };

  // const handleWrapSol = async () => {
  //   if (!primaryWallet?.address || !amount || isNaN(parseFloat(amount))) {
  //     setError("Please enter a valid amount");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");
  //   setSuccess("");

  //   try {
  //     const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
  //     const publicKey = new PublicKey(primaryWallet.address);

  //     // Check if the user has a wSOL account
  //     const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
  //       publicKey,
  //       { mint: WRAPPED_SOL_MINT }
  //     );

  //     let wsolTokenAccount;
  //     let transaction = new Transaction();

  //     if (tokenAccounts.value.length === 0) {
  //       // No existing wSOL account, we'll need to create one
  //       // This is simplified - in a real app you would implement this with
  //       // createAssociatedTokenAccountInstruction from SPL Token library
  //       setError(
  //         "You need to have a wSOL token account first. Try receiving a small amount of wSOL."
  //       );
  //       setLoading(false);
  //       return;
  //     } else {
  //       wsolTokenAccount = new PublicKey(tokenAccounts.value[0].pubkey);
  //     }

  //     // Build transaction to wrap SOL
  //     const transaction = new Transaction().add(
  //       SystemProgram.transfer({
  //         fromPubkey: publicKey,
  //         toPubkey: wsolTokenAccount,
  //         lamports: amountLamports
  //       })
  //     );

  //     // Request signature from the wallet
  //     const { signature } = await primaryWallet.wallet.signAndSendTransaction(
  //       transaction
  //     );

  //     // Wait for confirmation
  //     await connection.confirmTransaction(signature);

  //     setSuccess(`Successfully wrapped ${amount} SOL to wSOL!`);
  //     fetchBalances();
  //   } catch (err) {
  //     console.error("Error wrapping SOL:", err);
  //     setError(err.message || "Failed to wrap SOL");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleUnwrapSol = async () => {
  //   if (!primaryWallet?.address || !amount || isNaN(parseFloat(amount))) {
  //     setError("Please enter a valid amount");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");
  //   setSuccess("");

  //   try {
  //     const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
  //     const publicKey = new PublicKey(primaryWallet.address);

  //     // Find wSOL token account
  //     const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
  //       publicKey,
  //       { mint: WRAPPED_SOL_MINT }
  //     );

  //     if (tokenAccounts.value.length === 0) {
  //       setError("No wSOL token account found");
  //       setLoading(false);
  //       return;
  //     }

  //     const wsolTokenAccount = new PublicKey(tokenAccounts.value[0].pubkey);

  //     // In a real implementation, you'd use Token.createCloseAccountInstruction
  //     // This is a simplified version
  //     // You would need to properly implement unwrapping using SPL Token library
  //     setError(
  //       "Unwrapping functionality requires additional implementation with SPL Token library."
  //     );
  //     setLoading(false);
  //     return;

  //     // Note: The code below is a placeholder and would need proper implementation
      
  //     // const transaction = new Transaction().add(
  //     //   Token.createCloseAccountInstruction(
  //     //     TOKEN_PROGRAM_ID,
  //     //     wsolTokenAccount,
  //     //     publicKey,
  //     //     publicKey,
  //     //     []
  //     //   )
  //     // );
      
  //     // const { signature } = await primaryWallet.wallet.signAndSendTransaction(transaction);
  //     // await connection.confirmTransaction(signature);
      
  //     // setSuccess(`Successfully unwrapped ${amount} wSOL to SOL!`);
  //     // fetchBalances();
      
  //   } catch (err) {
  //     console.error("Error unwrapping wSOL:", err);
  //     setError(err.message || "Failed to unwrap wSOL");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleWrapSol = async () => {
    if (!primaryWallet?.address || !amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

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
          lamports: amountLamports,
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
            // onConfirmOrder();
            // console.log(
            //   `Transaction successful: https://solscan.io/tx/${value.signature}?cluster=${cluster}`
            // );
            setSuccess(`Successfully wrapped ${amount} SOL to wSOL!`);
            fetchBalances();
          })
          .catch((error) => {
            setError(error || "Failed to wrapper SOL");
          });
      
     
    } catch (err) {
      console.error("Error wrapping SOL:", err);
      setError(err.message || "Failed to wrap SOL");
    } finally {
      setLoading(false);
    }
  };

  const handleUnwrapSol = async () => {
    if (!primaryWallet?.address || !amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount");
      return;
    }
  
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      const publicKey = new PublicKey(primaryWallet.address);
      
      // Find wSOL token account
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: WRAPPED_SOL_MINT }
      );
      
      if (tokenAccounts.value.length === 0) {
        setError("No wSOL token account found");
        setLoading(false);
        return;
      }
      
      const wsolTokenAccountInfo = tokenAccounts.value[0];
      const wsolTokenAccount = new PublicKey(wsolTokenAccountInfo.pubkey);
      const wsolBalance = wsolTokenAccountInfo.account.data.parsed.info.tokenAmount.amount;
      
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
        setError("Partial unwrapping is not supported. Please unwrap all your wSOL.");
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
          setSuccess(`Successfully unwrapped all wSOL to SOL!`);
          fetchBalances();
        })
        .catch((error) => {
          console.error("Error unwrapping wSOL:", error);
          setError(error.message || "Failed to unwrap wSOL");
        });
    
    } catch (err) {
      console.error("Error unwrapping wSOL:", err);
      setError(err.message || "Failed to unwrap wSOL");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "wrap") {
      handleWrapSol();
    } else {
      handleUnwrapSol();
    }
  };

  if (!primaryWallet?.address) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div>
          <p>Connect Wallet</p>
        </div>
        <div>
          <p className="text-center mb-4">
            Please connect your wallet to wrap or unwrap SOL
          </p>
        </div>
        <div className=" mw-4:w-[340px] mw-9:w-[360px] mw-5:w-[400px] w-[460px] ">
          <button
            onClick={() => setShowAuthFlow(true)}
            className="mt-10 w-[100%] px-8 py-3 bg-darkPrimary font-inter text-sm sm:text-base text-[#231F20] font-semibold rounded-full cursor-pointer hover:bg-white transition duration-300"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div>
        <p>SOL Wrap/Unwrap</p>
      </div>
      <div>
        <div className="flex justify-between mb-4 text-sm">
          <div>
            <p>SOL Balance:</p>
            <p className="font-medium">{balance.sol.toFixed(4)} SOL</p>
          </div>
          <div>
            <p>wSOL Balance:</p>
            <p className="font-medium">{balance.wsol.toFixed(4)} wSOL</p>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 mb-4">
            <div onClick={() => setActiveTab("wrap")} value="wrap">
              Wrap SOL
            </div>
            <div onClick={() => setActiveTab("unwrap")} value="unwrap">
              Unwrap SOL
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === "wrap" && (
              <div value="wrap">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Amount of SOL to wrap"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.001"
                      required
                      className="flex-1 text-black"
                    />
                    <button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setAmount(Math.max(0, balance.sol - 0.01).toString())
                      }
                      className="whitespace-nowrap"
                    >
                      Max
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <LuArrowUpDown className="text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="w-full"
                    disabled={loading || !amount || parseFloat(amount) <= 0}
                  >
                    {loading ? "Processing..." : "Wrap SOL"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "unwrap" && (
              <div value="unwrap">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Amount of wSOL to unwrap"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.001"
                      required
                      className="flex-1 text-black"
                    />
                    <button
                      type="button"
                      variant="outline"
                      onClick={() => setAmount(balance.wsol.toString())}
                      className="whitespace-nowrap"
                    >
                      Max
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <LuArrowUpDown className="text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="w-full"
                    disabled={loading || !amount || parseFloat(amount) <= 0}
                  >
                    {loading ? "Processing..." : "Unwrap wSOL"}
                  </button>
                </div>
              </div>
            )}
          </form>

          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          {success && <p className="text-green-500 mt-4 text-sm">{success}</p>}

          <div className="mt-6 text-xs text-gray-500">
            <p>
              Connected wallet: {primaryWallet.address.slice(0, 4)}...
              {primaryWallet.address.slice(-4)}
            </p>
            <p className="mt-1">
              <button
                onClick={fetchBalances}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Refresh balances
              </button>
              <button
                onClick={handleLogOut}
                className="text-blue-500 hover:text-blue-700"
              >
                Disconnect
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrapUnwrapSol;
