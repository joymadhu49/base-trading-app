"use client";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import type { Token } from "@coinbase/onchainkit/token";
import { useState } from "react";
import { useAccount } from "wagmi";

// Dynamic imports to avoid SSR issues
const Wallet = dynamic(
  () => import("@coinbase/onchainkit/wallet").then((mod) => mod.Wallet),
  { ssr: false }
);

const ConnectWallet = dynamic(
  () => import("@coinbase/onchainkit/wallet").then((mod) => mod.ConnectWallet),
  { ssr: false }
);

const Avatar = dynamic(
  () => import("@coinbase/onchainkit/identity").then((mod) => mod.Avatar),
  { ssr: false }
);

const Name = dynamic(
  () => import("@coinbase/onchainkit/identity").then((mod) => mod.Name),
  { ssr: false }
);

const Swap = dynamic(
  () => import("@coinbase/onchainkit/swap").then((mod) => mod.Swap),
  { ssr: false }
);

const SwapAmountInput = dynamic(
  () => import("@coinbase/onchainkit/swap").then((mod) => mod.SwapAmountInput),
  { ssr: false }
);

const SwapToggleButton = dynamic(
  () => import("@coinbase/onchainkit/swap").then((mod) => mod.SwapToggleButton),
  { ssr: false }
);

const SwapButton = dynamic(
  () => import("@coinbase/onchainkit/swap").then((mod) => mod.SwapButton),
  { ssr: false }
);

const SwapMessage = dynamic(
  () => import("@coinbase/onchainkit/swap").then((mod) => mod.SwapMessage),
  { ssr: false }
);

const SwapToast = dynamic(
  () => import("@coinbase/onchainkit/swap").then((mod) => mod.SwapToast),
  { ssr: false }
);

const Buy = dynamic(
  () => import("@coinbase/onchainkit/buy").then((mod) => mod.Buy),
  { ssr: false }
);

// Token definitions
const ETHToken: Token = {
  address: "",
  chainId: 8453,
  decimals: 18,
  name: "Ethereum",
  symbol: "ETH",
  image: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
};

const USDCToken: Token = {
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  chainId: 8453,
  decimals: 6,
  name: "USDC",
  symbol: "USDC",
  image: "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
};

const DEGENToken: Token = {
  address: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
  chainId: 8453,
  decimals: 18,
  name: "DEGEN",
  symbol: "DEGEN",
  image: "https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm",
};

const CBBTC: Token = {
  address: "0xc211e1f853a898bd1302385ccde55f33a8c4b3f3",
  chainId: 8453,
  decimals: 8,
  name: "cbBTC",
  symbol: "cbBTC",
  image: "https://dynamic-assets.coinbase.com/e52d2d94cb8c70e26f4e74cb0b9e3a289e62f7f1e3e6c2a8b3c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
};

const swappableTokens: Token[] = [ETHToken, USDCToken, DEGENToken, CBBTC];

// Market data (would come from API in production)
const marketData = [
  { symbol: "cbBTC", price: "$88,345", change: "+0.14%", positive: true },
  { symbol: "ETH", price: "$3,241", change: "+1.23%", positive: true },
  { symbol: "USDC", price: "$1.00", change: "0.00%", positive: true },
  { symbol: "DEGEN", price: "$0.0419", change: "-4.39%", positive: false },
  { symbol: "VIRTUAL", price: "$0.807", change: "-0.36%", positive: false },
  { symbol: "CLAWD", price: "$0.000201", change: "-6.19%", positive: false },
];

type Tab = "swap" | "buy" | "portfolio";

export default function Home() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<Tab>("swap");

  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        <Wallet>
          <ConnectWallet>
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
        </Wallet>
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>Base Trading App</h1>
        <p className={styles.subtitle}>Swap, Buy & Track on Base</p>

        {/* Tab Navigation */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "swap" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("swap")}
          >
            Swap
          </button>
          <button
            className={`${styles.tab} ${activeTab === "buy" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("buy")}
          >
            Buy
          </button>
          <button
            className={`${styles.tab} ${activeTab === "portfolio" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </button>
        </div>

        {address ? (
          <div className={styles.swapContainer}>
            {activeTab === "swap" && (
              <Swap isSponsored>
                <SwapAmountInput
                  label="Sell"
                  swappableTokens={swappableTokens}
                  token={ETHToken}
                  type="from"
                />
                <SwapToggleButton />
                <SwapAmountInput
                  label="Buy"
                  swappableTokens={swappableTokens}
                  token={USDCToken}
                  type="to"
                />
                <SwapButton />
                <SwapMessage />
                <SwapToast />
              </Swap>
            )}

            {activeTab === "buy" && (
              <div className={styles.buyContainer}>
                <Buy toToken={DEGENToken} isSponsored />
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className={styles.portfolioContainer}>
                <div className={styles.portfolioHeader}>
                  <h3>Your Portfolio</h3>
                  <span className={styles.totalValue}>$0.00</span>
                </div>
                <div className={styles.portfolioList}>
                  <div className={styles.portfolioItem}>
                    <div className={styles.tokenInfo}>
                      <span className={styles.tokenSymbol}>ETH</span>
                      <span className={styles.tokenName}>Ethereum</span>
                    </div>
                    <div className={styles.tokenBalance}>
                      <span className={styles.balance}>0.00 ETH</span>
                      <span className={styles.balanceUsd}>$0.00</span>
                    </div>
                  </div>
                  <div className={styles.portfolioItem}>
                    <div className={styles.tokenInfo}>
                      <span className={styles.tokenSymbol}>USDC</span>
                      <span className={styles.tokenName}>USD Coin</span>
                    </div>
                    <div className={styles.tokenBalance}>
                      <span className={styles.balance}>0.00 USDC</span>
                      <span className={styles.balanceUsd}>$0.00</span>
                    </div>
                  </div>
                </div>
                <p className={styles.connectWalletText}>
                  Connect wallet to view holdings
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.connectPrompt}>
            <p>Connect your wallet to start trading</p>
            <Wallet>
              <ConnectWallet className={styles.connectButton}>
                <Avatar className="h-5 w-5" />
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
        )}

        {/* Market Data Section */}
        <div className={styles.marketSection}>
          <h3 className={styles.sectionTitle}>📈 Trending on Base</h3>
          <div className={styles.marketGrid}>
            {marketData.map((token) => (
              <div key={token.symbol} className={styles.marketCard}>
                <span className={styles.marketSymbol}>{token.symbol}</span>
                <span className={styles.marketPrice}>{token.price}</span>
                <span className={`${styles.marketChange} ${token.positive ? styles.positive : styles.negative}`}>
                  {token.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <h3>Supported Tokens</h3>
            <ul>
              <li>ETH - Ethereum</li>
              <li>USDC - USD Coin</li>
              <li>DEGEN - Degen</li>
              <li>cbBTC - Coinbase BTC</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Features</h3>
            <ul>
              <li>✓ Gasless swaps</li>
              <li>✓ Apple Pay / Debit</li>
              <li>✓ Low fees (&lt;$0.01)</li>
              <li>✓ 2s block time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}