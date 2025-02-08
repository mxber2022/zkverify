import ConnectWalletButton from "./ConnectWalletButton";

export function DockNav() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center justify-between h-14">
          <div className="text-lg font-bold relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              WinWave
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <WalletButton /> */}
            <appkit-button />
            <ConnectWalletButton onWalletConnected={() => {}} />
          </div>
        </nav>
      </div>
    </div>
  );
}
