"use client";

import React, { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMint
} from "@solana/spl-token";

const SOLANA_RPC_URL = "https://api.devnet.solana.com";
// const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";


const CreateTestTokenAccounts = () => {
  const { primaryWallet } = useDynamicContext();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const connection = new Connection(SOLANA_RPC_URL);
  

  // Helper function to create a token mint
  const createToken = async (ownerPublicKey, decimals) => {
    const mintKeypair = Keypair.generate();
    const mintAuthority = ownerPublicKey;
    const freezeAuthority = ownerPublicKey;

    // Calculate minimum rent required
    const lamports = await connection.getMinimumBalanceForRentExemption(82);

    // Create a transaction for token creation
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: ownerPublicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: 82,
        lamports,
        programId: TOKEN_PROGRAM_ID
      }),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        decimals,
        mintAuthority,
        freezeAuthority,
        TOKEN_PROGRAM_ID
      )
    );

    // Get the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = ownerPublicKey;

    // Sign with the mint keypair
    transaction.partialSign(mintKeypair);

    // Sign with the owner (user's wallet)
    const signer = await primaryWallet.getSigner();
    // const signedTx = await signer.signTransaction(transaction);

    // // Send the signed transaction
    // const signature = await connection.sendRawTransaction(signedTx.serialize());
    // await connection.confirmTransaction(signature);

    try {
        await signer.signAndSendTransaction(transaction);
        return mintKeypair.publicKey; // Return the mint public key
      } catch (error) {
        console.error(error || "Failed to create token");
        throw error; // Re-throw to handle in the calling function
      }
  };

  // Helper function to create a token account
  const createTokenAccount = async (tokenMint, ownerPublicKey) => {
    const associatedTokenAddress = await getAssociatedTokenAddress(
      tokenMint,
      ownerPublicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        ownerPublicKey,
        associatedTokenAddress,
        ownerPublicKey,
        tokenMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    // Get the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = ownerPublicKey;

    // Sign and send the transaction
    const signer = await primaryWallet.getSigner();
    // const signedTx = await signer.signTransaction(transaction);
    // const signature = await connection.sendRawTransaction(signedTx.serialize());
    // await connection.confirmTransaction(signature);
    try {
        await signer.signAndSendTransaction(transaction);
        return associatedTokenAddress; // Return the token account address
      } catch (error) {
        console.error(error || "Failed to create token account");
        throw error;
      }
  };

  // Helper function to mint tokens to a token account
  const mintTokens = async (
    tokenMint,
    tokenAccount,
    ownerPublicKey,
    amount
  ) => {
    const transaction = new Transaction().add(
      createMintToInstruction(
        tokenMint,
        tokenAccount,
        ownerPublicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    // Get the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = ownerPublicKey;

    // Sign and send the transaction
    const signer = await primaryWallet.getSigner();
    // const signedTx = await signer.signTransaction(transaction);
    // const signature = await connection.sendRawTransaction(signedTx.serialize());
    // await connection.confirmTransaction(signature);
    await signer
      .signAndSendTransaction(transaction)
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        console.error(error || "Failed to wrapper SOL");
      });
  };

  // Create test token accounts
  const createTestAccounts = async () => {
    if (!primaryWallet?.address) {
      setStatus("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setStatus("Creating test token accounts...");

    try {
      const publicKey = new PublicKey(primaryWallet.address);

      // 1. Create first token with balance
      setStatus("Creating first test token...");
      const token1 = await createToken(publicKey, 9);
      setStatus(`Created token 1: ${token1}`);

      // Create token account for token 1
      setStatus("Creating account for token 1...");
      const tokenAccount1 = await createTokenAccount(token1, publicKey);
      setStatus(`Created token account 1: ${tokenAccount1}`);

      // Mint tokens to token account 1
      setStatus("Minting tokens to account 1...");
      await mintTokens(token1, tokenAccount1, publicKey, 100 * 10 ** 9);
      setStatus("Minted 100 tokens to first account");

      // 2. Create second token with empty balance
      setStatus("Creating second test token...");
      const token2 = await createToken(publicKey, 9);
      setStatus(`Created token 2: ${token2}`);

      // Create token account for token 2 (empty)
      setStatus("Creating empty account for token 2...");
      const tokenAccount2 = await createTokenAccount(token2, publicKey);
      setStatus(`Created empty token account 2: ${tokenAccount2}`);

      // 3. Create third token with empty balance
      setStatus("Creating third test token...");
      const token3 = await createToken(publicKey, 9);
      setStatus(`Created token 3: ${token3}`);

      // Create token account for token 3 (empty)
      setStatus("Creating empty account for token 3...");
      const tokenAccount3 = await createTokenAccount(token3, publicKey);
      setStatus(`Created empty token account 3: ${tokenAccount3}`);

      setStatus(
        "Successfully created test accounts! You now have 3 token accounts:\n" +
          "1. With balance (can't be closed)\n" +
          "2. Empty account (can be closed)\n" +
          "3. Empty account (can be closed)"
      );
    } catch (error) {
      console.error("Error creating test accounts:", error);
      setStatus(
        "Error: " + (error.message || "Failed to create test accounts")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Test Account Creator</h2>

      {primaryWallet?.address ? (
        <>
          <p className="mb-4">
            This will create 3 test token accounts in your wallet:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>One with balance (cannot be closed)</li>
            <li>Two with zero balance (can be closed)</li>
          </ul>

          <button
            onClick={createTestAccounts}
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Create Test Accounts"}
          </button>

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

export default CreateTestTokenAccounts;
