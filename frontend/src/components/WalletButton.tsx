import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { WalletSelect } from '@talismn/connect-components';
import { useAccount } from '../contexts/AccountContext';

export function WalletButton() {
  const { selectedAccount, setSelectedAccount } = useAccount();
  const [isWalletSelectOpen, setIsWalletSelectOpen] = useState(false);
  const [evmAccount, setEvmAccount] = useState<string | null>(null);

  const handleWalletConnectOpen = () => {
    setIsWalletSelectOpen(true);
  };

  const handleWalletConnectClose = () => {
    setIsWalletSelectOpen(false);
  };

  const handleWalletSelected = (wallet: any) => {
    console.log('Wallet selected:', wallet);
  };

  const handleUpdatedAccounts = (accounts: any[] | undefined) => {
    console.log('Updated accounts:', accounts);
    if (accounts && accounts.length > 0) {
      setSelectedAccount(accounts[0].address);
    } else {
      setSelectedAccount(null);
      console.error('No accounts available.');
    }
  };

  const handleAccountSelected = (account: any) => {
    console.log('Account selected:', account);
    setSelectedAccount(account.address);
    console.log(`Connected account: ${account.address}`);
  };

  const handleError = (error: any) => {
    console.error('Error during wallet interaction:', error);
    const errorMessage = error && typeof error === 'object' && 'message' in error
      ? error.message
      : 'Unknown error occurred during wallet interaction';

    if (errorMessage !== 'Unknown error occurred during wallet interaction') {
      console.error(`An error occurred: ${errorMessage}`);
    }
  };

  const buttonClasses = "flex items-center gap-2 py-1.5 px-3 rounded-lg font-medium text-xs text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 relative z-10";
  const wrapperClasses = "relative group";
  const glowClasses = "absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-200";

  return (
    <div className="flex items-center gap-2">
      <div className={wrapperClasses}>
        <div className={glowClasses} />
        <appkit-button>
          <button className={buttonClasses}>
            <Wallet className="w-4 h-4" />
            <span>
              {evmAccount 
                ? `${evmAccount.slice(0, 6)}...${evmAccount.slice(-4)}`
                : 'EVM Wallet'}
            </span>
          </button>
        </appkit-button>
      </div>

      <div className={wrapperClasses}>
        <div className={glowClasses} />
        <button
          onClick={handleWalletConnectOpen}
          className={buttonClasses}
        >
          <Wallet className="w-4 h-4" />
          <span>
            {selectedAccount 
              ? `${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`
              : 'Polkadot Wallet'}
          </span>
        </button>
      </div>

      {isWalletSelectOpen && (
        <WalletSelect
          dappName="WinWave"
          open={isWalletSelectOpen}
          onWalletConnectOpen={handleWalletConnectOpen}
          onWalletConnectClose={handleWalletConnectClose}
          onWalletSelected={handleWalletSelected}
          onUpdatedAccounts={handleUpdatedAccounts}
          onAccountSelected={handleAccountSelected}
          onError={handleError}
          showAccountsList={true}
        />
      )}
    </div>
  );
}