import React, { useState, useEffect, forwardRef, lazy } from "react";
import { useAccountSubstrate } from "../contexts/AccountContext";
// import styles from "./ConnectWalletButton.module.css";

// Lazy loading the WalletSelect component
const WalletSelectLazy = lazy(() =>
  import("@talismn/connect-components").then((mod) => ({
    default: mod.WalletSelect,
  }))
);

export interface ConnectWalletButtonHandle {
  openWalletModal: () => void;
  closeWalletModal: () => void;
}

const ConnectWalletButton = forwardRef<
  ConnectWalletButtonHandle,
  { onWalletConnected: (rowIndex: number) => void }
>(() => {
  const {
    selectedAccount,
    setSelectedAccount,
    selectedWallet,
    setSelectedWallet,
  } = useAccountSubstrate();
  const [isWalletSelectOpen, setIsWalletSelectOpen] = useState(false);
  const [isWalletSelectLoaded, setIsWalletSelectLoaded] = useState(false);

  // Dynamically load the WalletSelect component on demand
  useEffect(() => {
    if (isWalletSelectOpen && !isWalletSelectLoaded) {
      import("@talismn/connect-components")
        .then((mod) => mod.WalletSelect)
        .then(() => setIsWalletSelectLoaded(true));
    }
  }, [isWalletSelectOpen, isWalletSelectLoaded]);

  const handleWalletConnectOpen = () => setIsWalletSelectOpen(true);
  const handleWalletConnectClose = () => setIsWalletSelectOpen(false);

  const handleWalletSelected = (wallet: any) => {
    setSelectedWallet(wallet.extensionName);
  };

  const handleUpdatedAccounts = (accounts: any[] | undefined) => {
    if (accounts && accounts.length > 0) {
      setSelectedAccount(accounts[0].address);
    } else {
      setSelectedAccount(null);
    }
  };

  const handleAccountSelected = (account: any) => {
    setSelectedAccount(account.address);
  };

  return (
    <>
      <button
        onClick={handleWalletConnectOpen}
        className="bg-blue-400 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      >
        {selectedAccount
          ? `${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`
          : "Connect ZKVerify Wallet"}
      </button>

      {isWalletSelectOpen && isWalletSelectLoaded && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <WalletSelectLazy
            dappName="zkVerify"
            open={isWalletSelectOpen}
            onWalletConnectOpen={handleWalletConnectOpen}
            onWalletConnectClose={handleWalletConnectClose}
            onWalletSelected={handleWalletSelected}
            onUpdatedAccounts={handleUpdatedAccounts}
            onAccountSelected={handleAccountSelected}
            showAccountsList
          />
        </React.Suspense>
      )}
    </>
  );
});

ConnectWalletButton.displayName = "ConnectWalletButton";
export default ConnectWalletButton;
