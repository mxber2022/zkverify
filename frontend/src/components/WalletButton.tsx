import React from 'react';
import { Wallet } from 'lucide-react';

export function WalletButton() {
  return (
    <appkit-button>
      <button className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium text-xs">
        <Wallet className="w-4 h-4" />
        <span>Connect Wallet</span>
      </button>
    </appkit-button>
  );
}