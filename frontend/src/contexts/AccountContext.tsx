import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface AccountContextType {
  selectedAccount: string | null;
  selectedWallet: string | null;
  setSelectedAccount: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedWallet: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export const AccountProviderSubstrate: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  console.log("selectedWallet: hehe ", selectedWallet);
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

export const useAccountSubstrate = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error("useAccount must be used within an AccountProvider");
  return context;
};
