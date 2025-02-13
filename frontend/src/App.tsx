import React, { useState, useEffect } from "react";
import {
  Gift,
  Loader2,
  Sparkles,
  Trophy,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { PlatformSelector } from "./components/PlatformSelector";
import { EngagementSelector } from "./components/EngagementSelector";
import { WinnerCard } from "./components/WinnerCard";
import { CommentsList } from "./components/CommentsList";
import { DockNav } from "./components/DockNav";
import { Footer } from "./components/Footer";
import type { Platform, Winner, Comment, EngagementType } from "./types";
import { useRef } from "react";
//import proofData from "./proofs/risc0_v1_0.json";
import proofData from "./proofs/myproof.json";
import { useAccountSubstrate } from "./contexts/AccountContext";
import { useZkVerify } from "./hooks/useZkVerify";
import styles from "./page.module.css";
function App() {
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [url, setUrl] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);
  const [engagementType, setEngagementType] =
    useState<EngagementType>("comments");
  const [winners, setWinners] = useState<Winner[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [touched, setTouched] = useState({ url: false, winnerCount: false });

  const [loadings, setLoadings] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  );
  const [blockHash, setBlockHash] = useState<string | null>(null);

  const { selectedAccount, selectedWallet } = useAccountSubstrate();
  const { onVerifyProof, status, eventData, transactionResult, error } =
    useZkVerify();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidWinnerCount = (count: number) => count >= 1 && count <= 100;

  const errors = {
    url: touched.url && !isValidUrl(url) ? "Please enter a valid URL" : "",
    winnerCount:
      touched.winnerCount && !isValidWinnerCount(winnerCount)
        ? "Please enter a number between 1 and 100"
        : "",
  };

  useEffect(() => {
    if (url && isValidUrl(url)) {
      setLoadingComments(true);
      // Simulating API call with real comments data
      setTimeout(() => {
        const realComments: Comment[] = [
          {
            id: "1",
            username: "therollupco",
            profileImage:
              "https://pbs.twimg.com/profile_images/1813577611680849920/4Dm6Sp8v_400x400.jpg",
            content:
              "Excited to see zkVerify making verification faster and more accessible",
            timestamp: "2024-02-05T12:00:00Z",
            likes: 0,
            retweets: 0,
            replies: 0,
          },
          {
            id: "2",
            username: "TMehedi30",
            profileImage:
              "	https://pbs.twimg.com/profile_images/1611570182438416384/8F_YLjz__400x400.jpg",
            content:
              "I used to think ZK proofs were like my cooking skills—complex, slow, and definitely not worth the expense! 😂 But with PublicAI, we're cooking up something tasty! 🍽️",
            timestamp: "2024-02-05T12:30:00Z",
            likes: 0,
            retweets: 0,
            replies: 0,
          },
          {
            id: "3",
            username: "Thao19872017",
            profileImage:
              "https://pbs.twimg.com/profile_images/1857385334197366784/jciBl5zF_400x400.jpg",
            content:
              "I used to think ZK proofs were like my cooking skills—complex, slow, and a bit of a disaster! But with PublicAI, we're flipping the script! 🍳🙌 #PublicAI",
            timestamp: "2024-02-05T13:00:00Z",
            likes: 0,
            retweets: 0,
            replies: 0,
          },
          {
            id: "4",
            username: "TRADE_600",
            profileImage:
              "https://pbs.twimg.com/profile_images/1838962147642228736/HHWy9x99_400x400.jpg",
            content: "where guide verify ?",
            timestamp: "2024-02-05T13:30:00Z",
            likes: 0,
            retweets: 0,
            replies: 0,
          },
          {
            id: "5",
            username: "Tipsdeck_03",
            profileImage:
              "https://pbs.twimg.com/profile_images/1880241767154438144/pg6NvX3v_400x400.jpg",
            content: "Scam",
            timestamp: "2024-02-05T14:00:00Z",
            likes: 0,
            retweets: 0,
            replies: 0,
          },
        ];

        setComments(realComments);
        setLoadingComments(false);
      }, 1000);
    } else {
      setComments([]);
    }
  }, [url]);

  function delay(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ url: true, winnerCount: true });
    if (errors.url || errors.winnerCount) return;
    setLoading(true);

    await delay(10000);
    if (!selectedAccount || !selectedWallet) {
      console.log("selectedAccount: ", selectedAccount);
      console.log("selectedWallet: ", selectedWallet);
      setVerificationResult("Please connect a wallet and select an account.");
      return;
    }

    setLoading(true);
    setVerificationResult(null);
    setBlockHash(null);

    const { vk, publicSignals, proof } = proofData;
    console.log("proofData: ", proofData);

    try {
      await onVerifyProof(proof, publicSignals, vk);
    } catch (error) {
      setVerificationResult(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }

    // Simulate API call
    setTimeout(() => {
      const mockWinners: Winner[] = Array.from(
        { length: winnerCount },
        (_, i) => ({
          id: "TRADE_600",
          platform,
          username: "TRADE_600",
          profileImage:
            "https://pbs.twimg.com/profile_images/1838962147642228736/HHWy9x99_400x400.jpg",
          timestamp: new Date().toISOString(),
          engagementType,
        })
      );

      setWinners(mockWinners);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (error) {
      setVerificationResult(error);
    } else if (status === "verified") {
      setVerificationResult("Proof verified successfully!");
      if (eventData?.blockHash) {
        setBlockHash(eventData.blockHash);
      }
    } else if (status === "includedInBlock" && eventData) {
      setVerificationResult("Transaction Included In Block");
    } else if (status === "cancelled") {
      setVerificationResult("Transaction Rejected By User.");
    }
  }, [error, status, eventData]);

  const blockExplorerUrl = blockHash
    ? `https://testnet-explorer.zkverify.io/v0/block/${blockHash}`
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-900 via-blue-100 to-blue-900">
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080?abstract')] opacity-10 mix-blend-overlay"></div>
      <DockNav />
      <div className="relative flex-grow max-w-4xl mx-auto w-full px-4 py-8 mt-12">
        <div className="text-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative flex justify-center mb-3">
              <Gift className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-3 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            WinWave
          </h1>
          <p className="text-black text-sm max-w-lg mx-auto">
            Powered by ZK-Verify, ensuring verifiable randomness and trustless
            winner selection across Twitter, Farcaster, and Lens Protocol
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)] p-6 mb-6 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PlatformSelector selected={platform} onSelect={setPlatform} />

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                  Post URL
                </label>

                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, url: true }))
                    }
                    placeholder="Enter the post URL"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white/5 text-gray-800 placeholder:text-gray-500 border focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.url
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-white/10 focus:ring-blue-500/50"
                    }`}
                  />
                  {errors.url && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.url && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5 animate-fade-in">
                    {errors.url}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                  Pick Winners From
                </label>
                <EngagementSelector
                  selected={engagementType}
                  onSelect={setEngagementType}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                  Number of Winners
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={winnerCount}
                    onChange={(e) => setWinnerCount(parseInt(e.target.value))}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, winnerCount: true }))
                    }
                    className={`w-full px-3 py-2.5 rounded-lg bg-white/5 text-gray-800 placeholder:text-gray-500 border focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.winnerCount
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-white/10 focus:ring-blue-500/50"
                    }`}
                  />
                  {errors.winnerCount && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.winnerCount && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5 animate-fade-in">
                    {errors.winnerCount}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-5 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Picking Winners...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Pick Winners</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>

        {url && isValidUrl(url) && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)] p-6 mb-6 border border-white/20 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Comments
            </h2>
            <CommentsList comments={comments} loading={loadingComments} />
          </div>
        )}

        {winners.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Winners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {winners.map((winner) => (
                <WinnerCard key={winner.id} winner={winner} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        {eventData && status === "includedInBlock" && (
          <div className={styles.resultSection}>
            <p>Block Hash: {eventData.blockHash || "N/A"}</p>
          </div>
        )}

        {transactionResult && (
          <div className={styles.transactionDetails}>
            {verificationResult && (
              <p
                className={
                  verificationResult.includes("failed") ||
                  verificationResult.includes("Error") ||
                  verificationResult.includes("Rejected")
                    ? styles.resultError
                    : styles.resultSuccess
                }
              >
                {verificationResult}
              </p>
            )}

            <p>Transaction Hash: {transactionResult.txHash || "N/A"}</p>
            <p>Proof Type: {transactionResult.proofType || "N/A"}</p>
            <p>Attestation ID: {transactionResult.attestationId || "N/A"}</p>

            {blockExplorerUrl && (
              <div className={styles.resultLink}>
                <a
                  href={blockExplorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Transaction on Explorer
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
