import { useState } from "react";
import { useAccountSubstrate } from "../contexts/AccountContext";

export function useZkVerify() {
  const { selectedAccount, selectedWallet } = useAccountSubstrate();
  const [status, setStatus] = useState<string | null>(null);
  const [eventData, setEventData] = useState<any>(null);
  const [transactionResult, setTransactionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  function delay(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onVerifyProof = async (
    proof: string,
    publicSignals: any,
    vk: any
  ): Promise<void> => {
    try {
      if (!proof || !publicSignals || !vk) {
        throw new Error(
          "Proof, public signals, or verification key is missing"
        );
      }

      if (!selectedWallet || !selectedAccount) {
        throw new Error("Wallet or account is not selected");
      }

      const proofData = proof;
      const { zkVerifySession } = await import("zkverifyjs");
      const session = await zkVerifySession.start().Testnet().withWallet({
        source: selectedWallet,
        accountAddress: selectedAccount,
      });

      setStatus("verifying");
      setError(null);
      setTransactionResult(null);

      const { events, transactionResult } = await session
        .verify()
        .risc0()
        .execute({
          proofData: {
            proof: proofData,
            publicSignals: publicSignals,
            vk: vk,
            version: "V1_2",
          },
        });

      console.log("transactionResult: ", transactionResult);

      events.on("includedInBlock", (data: any) => {
        setStatus("includedInBlock");
        setEventData(data);
      });

      let transactionInfo = null;
      try {
        transactionInfo = await transactionResult;
        setTransactionResult(transactionInfo);
      } catch (error: unknown) {
        if ((error as Error).message.includes("Rejected by user")) {
          setError("Transaction Rejected By User.");
          setStatus("cancelled");
          return;
        }
        throw new Error(`Transaction failed: ${(error as Error).message}`);
      }

      if (
        transactionInfo &&
        transactionInfo.attestationId &&
        transactionInfo.leafDigest
      ) {
        await delay(70000);
        let proof, numberOfLeaves, leafIndex;
        try {
          const proofDetails = await session.poe(
            transactionInfo.attestationId,
            transactionInfo.leafDigest
          );
          ({ proof: proof, numberOfLeaves, leafIndex } = await proofDetails);

          console.log("proofDetails: ", proofDetails);
          console.log(`Merkle proof details`);
          console.log(`\tmerkleProof: ${proof}`);
          console.log(`\tnumberOfLeaves: ${numberOfLeaves}`);
          console.log(`\tleafIndex: ${leafIndex}`);
        } catch (error) {
          console.error("RPC failed:", error);
        }

        setStatus("verified");
      } else {
        throw new Error("Your proof isn't correct.");
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      setStatus("error");
    }
  };

  return { status, eventData, transactionResult, error, onVerifyProof };
}
