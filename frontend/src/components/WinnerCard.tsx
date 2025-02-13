import React, { useState } from "react";
import {
  Trophy,
  MessageCircle,
  Heart,
  Repeat,
  Sparkles,
  Loader2,
  Wallet,
} from "lucide-react";
import { Winner, EngagementType } from "../types";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Contract, ethers } from "ethers";
import { BrowserProvider } from "ethers";
import toast from "react-hot-toast";

const engagementIcons: Record<EngagementType, typeof Heart> = {
  comments: MessageCircle,
  likes: Heart,
  retweets: Repeat,
  all: Sparkles,
};

// Contract address - replace with your actual contract address
const contractAddress = "0x84239B1fDB29d493CAd65BecC55caCcfb8F144B4";

// The Contract ABI
const contractAbi = [
  "function checkHash(bytes memory _hash, uint256 _attestationId, bytes32[] calldata _merklePath, uint256 _leafCount, uint256 _index, address _mint) public",
];

export function WinnerCard({ winner }: { winner: Winner }) {
  const [isMinting, setIsMinting] = useState(false);
  const [mintAddress, setMintAddress] = useState("");
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const EngagementIcon = engagementIcons[winner.engagementType];

  const handleMintNFT = async () => {
    if (!isConnected) {
      alert("Please connect your wallet to mint the NFT.");
      return;
    }

    const targetAddress = mintAddress || address;
    if (!targetAddress) {
      alert(
        "Please enter a wallet address or connect your wallet to mint the NFT."
      );
      return;
    }

    try {
      setIsMinting(true);
      console.log("connected address: ", address);
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      //const signer = await ethersProvider.getSigner();

      // Create contract instance
      const contract = new Contract(contractAddress, contractAbi, signer);

      // Mock values for demonstration - these should come from your backend
      const mockValues = {
        hash: "0x19000000000000000800000000000000", // Replace with actual hash
        attestationId: "44201",
        merklePath: [
          "0xd87ed890409527919d6cc0ba4ee6162cf86f6eeba15dbe687ecfa9ae50c4a27a",
        ],
        leafCount: 2,
        index: 1,
      };

      // Call the checkHash function
      const tx = await contract.checkHash(
        mockValues.hash,
        mockValues.attestationId,
        mockValues.merklePath,
        mockValues.leafCount,
        mockValues.index,
        mintAddress
      );

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      toast.success("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="group bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/20">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full group-hover:animate-pulse"></div>
            <img
              src={winner.profileImage}
              alt={winner.username}
              className="relative w-14 h-14 rounded-full ring-2 ring-white/20 group-hover:ring-blue-500/50 transition-all duration-300"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
              @{winner.username}
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-1.5">
              <EngagementIcon className="w-3.5 h-3.5" />
              {winner.engagementType === "all"
                ? "All Engagement"
                : winner.engagementType}
            </p>
          </div>
          <Trophy className="ml-auto w-5 h-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Selected at: {new Date(winner.timestamp).toLocaleString()}
        </div>

        <div className="mt-4 relative">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-gray-600" />
            <label
              htmlFor="mintAddress"
              className="text-sm font-medium text-gray-700"
            >
              Mint to Address
            </label>
          </div>
          <input
            type="text"
            id="mintAddress"
            placeholder={address || "Enter wallet address"}
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/5 text-gray-800 placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
          />
          {address && !mintAddress && (
            <p className="mt-1 text-xs text-gray-500">
              Using connected wallet address
            </p>
          )}
        </div>

        <button
          onClick={handleMintNFT}
          disabled={isMinting || !isConnected}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
          <div className="relative flex items-center justify-center gap-2">
            {isMinting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Minting NFT...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {isConnected ? "Mint Winner NFT" : "Connect Wallet to Mint"}
                </span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
