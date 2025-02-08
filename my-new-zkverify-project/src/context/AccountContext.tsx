"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

export interface Wallet {
  extensionName: string;
  title: string;
  installed: boolean;
}

interface AccountContextType {
  selectedAccount: string | null;
  setSelectedAccount: React.Dispatch<React.SetStateAction<string | null>>;
  selectedWallet: Wallet | null;
  setSelectedWallet: React.Dispatch<React.SetStateAction<Wallet | null>>;
}

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export const AccountProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  console.log("selectedWalletsssss: ", selectedWallet?.extensionName);
  return (
    <AccountContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
        selectedWallet,
        setSelectedWallet,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
