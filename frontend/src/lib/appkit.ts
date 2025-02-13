import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { arbitrumSepolia } from "@reown/appkit/networks";

// Get projectId from environment variables
const projectId = "e25b316b566a2f03268c9dc27f05348e";

if (!projectId) {
  throw new Error("VITE_REOWN_PROJECT_ID is not defined");
}

// Configure networks
export const networks = [arbitrumSepolia];

// Configure metadata
const metadata = {
  name: "ZK",
  description: "zk",
  url: window.location.origin,
  icons: [
    "https://sapphire-following-turkey-778.mypinata.cloud/ipfs/QmYJrTbQk1JZovoQei79f1ZsyMrWwd58YwERN3w2ujtVa9",
  ],
};

// Create and export AppKit instance
export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});
