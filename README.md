# WinWave 🎉

> Fair and Transparent Winner Selection for Web3

WinWave is a decentralized application powered by ZK-Verify that ensures fair and transparent winner selection using ZK risk0 for social media giveaways across Twitter, Farcaster, and Lens Protocol.

## 🌟 Features

- **Trustless Winner Selection**: Leveraging zero-knowledge proofs for verifiable randomness
- **Multi-Platform Support**: Seamlessly manage giveaways across Twitter, Farcaster, and Lens Protocol
- **Real-time Verification**: Instant winner verification with cryptographic proof
- **Engagement Filtering**: Select winners based on comments, likes, retweets, or all interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A modern web browser

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mxber2022/zkverify.git
cd winwave
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_REOWN_PROJECT_ID=your_reown_project_id
```

4. Start the development server:

```bash
npm run dev
```

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Wallet Integration**:
  - EVM: @reown/appkit
  - Polkadot: @talismn/connect
- **Zero-Knowledge Proofs**: zkverifyjs
- **Build Tool**: Vite

## 🔒 Security Features

1. **Zero-Knowledge Verification**

   - Ensures winner selection cannot be manipulated
   - Provides cryptographic proof of fairness

2. **Wallet Integration**

   - Secure authentication
   - Transaction signing for on-chain verification

## 🎯 Problem Solution

WinWave addresses several critical issues in the social media giveaway space:

| Problem                | Solution                                           |
| ---------------------- | -------------------------------------------------- |
| Lack of Trust          | Zero-knowledge proofs ensure verifiable randomness |
| Platform Fragmentation | Unified interface for multiple social platforms    |
| Manual Verification    | Automated, instant winner verification             |
| Pseudo-Randomness      | Cryptographically secure random selection          |

## 📱 Usage

1. **Connect Wallet**

   - Click "Connect Wallet" in the top right
   - Choose between EVM or Polkadot wallet

2. **Configure Giveaway**

   - Select platform (Twitter/Farcaster/Lens)
   - Enter post URL
   - Choose engagement type
   - Set number of winners

3. **Select Winners**
   - Click "Pick Winners"
   - Wait for ZK proof generation
   - View verified winners

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- [ZK-Verify](https://zkverify.xyz) for the zero-knowledge proof infrastructure
- [Talisman](https://talisman.xyz) for Polkadot wallet integration
- [Reown](https://reown.xyz) for EVM wallet integration

## 📞 Support

For support, please open a GitHub issue.

---

Built with ❤️ by MX
