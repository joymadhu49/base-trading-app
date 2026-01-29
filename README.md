# Base Trading App

A crypto trading mini app built on Base using OnchainKit.

## 🚀 Features

- **Wallet Connection** - Smart Wallet onboarding with Base Account
- **Token Swapping** - Built-in Swap component (Uniswap V3)
- **Portfolio Tracking** - Track your Base holdings
- **Fiat Onramp** - Buy crypto with Apple Pay, Coinbase, Debit Card
- **Yield Farming** - Earn with Morpho vaults

## 🛠️ Tech Stack

- **Framework**: Next.js 15 + React 19
- **SDK**: OnchainKit (Coinbase)
- **Web3**: Wagmi + Viem
- **Styling**: Tailwind CSS
- **Chain**: Base (L2 by Coinbase)

## 📦 Installation

```bash
git clone https://github.com/joymadhu49/base-trading-app.git
cd base-trading-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## 📁 Project Structure

```
base-trading-app/
├── app/
│   ├── page.tsx           # Main dashboard
│   ├── layout.tsx         # App layout
│   └── rootProvider.tsx   # Web3 providers
├── components/            # React components
├── hooks/                 # Custom hooks
├── utils/                 # Helper functions
└── package.json
```

## 🔗 Links

- **Live App**: https://base-trading-app.vercel.app
- **Repo**: https://github.com/joymadhu49/base-trading-app
- **OnchainKit Docs**: https://docs.base.org/onchainkit
- **Base Docs**: https://docs.base.org

## 🏗️ Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

## 📄 License

MIT

---

Built with ❤️ on Base