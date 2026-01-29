"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

// Simpler wallet connection component
function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button className={styles.walletButton} onClick={() => disconnect()}>
        <span className={styles.walletIcon}>👛</span>
        <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
        <span className={styles.disconnectText}>Disconnect</span>
      </button>
    );
  }

  return (
    <button 
      className={styles.walletButton}
      onClick={() => {
        const connector = connectors[0];
        if (connector) connect({ connector });
      }}
    >
      <span className={styles.walletIcon}>🔗</span>
      Connect Wallet
    </button>
  );
}

// Simple Swap Component
function SwapInterface() {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");

  const tokens = [
    { symbol: "ETH", name: "Ethereum", decimals: 18 },
    { symbol: "USDC", name: "USD Coin", decimals: 6 },
    { symbol: "DEGEN", name: "Degen", decimals: 18 },
    { symbol: "cbBTC", name: "cbBTC", decimals: 8 },
  ];

  return (
    <div className={styles.swapInterface}>
      <div className={styles.swapInputGroup}>
        <label className={styles.swapLabel}>Sell</label>
        <div className={styles.swapInputRow}>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.swapInput}
          />
          <select 
            value={fromToken} 
            onChange={(e) => setFromToken(e.target.value)}
            className={styles.tokenSelect}
          >
            {tokens.map(t => (
              <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
            ))}
          </select>
        </div>
        <span className={styles.balanceText}>Balance: 0.00</span>
      </div>

      <div className={styles.swapDivider}>
        <span>↓</span>
      </div>

      <div className={styles.swapInputGroup}>
        <label className={styles.swapLabel}>Buy</label>
        <div className={styles.swapInputRow}>
          <input
            type="text"
            placeholder="0.00"
            readOnly
            className={styles.swapInput}
          />
          <select 
            value={toToken} 
            onChange={(e) => setToToken(e.target.value)}
            className={styles.tokenSelect}
          >
            {tokens.map(t => (
              <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
            ))}
          </select>
        </div>
      </div>

      <button className={styles.swapButton}>
        Review Swap
      </button>

      <div className={styles.swapInfo}>
        <span>Rate: 1 {fromToken} ≈ {fromToken === "ETH" && toToken === "USDC" ? "3,241.00" : "—"} USDC</span>
        <span>Network: Base</span>
      </div>
    </div>
  );
}

// Simple Buy Component
function BuyInterface() {
  return (
    <div className={styles.buyInterface}>
      <div className={styles.buyHeader}>
        <h3>Buy Crypto</h3>
        <p>Instant purchase with Apple Pay or Debit Card</p>
      </div>
      
      <div className={styles.buyInputGroup}>
        <label>Amount (USD)</label>
        <div className={styles.buyInputRow}>
          <span className={styles.currencySymbol}>$</span>
          <input type="number" placeholder="0.00" className={styles.buyInput} />
        </div>
      </div>

      <div className={styles.buyMethods}>
        <button className={styles.buyMethod}>
          <span className={styles.methodIcon}>🍎</span>
          <span>Apple Pay</span>
        </button>
        <button className={styles.buyMethod}>
          <span className={styles.methodIcon}>💳</span>
          <span>Debit Card</span>
        </button>
        <button className={styles.buyMethod}>
          <span className={styles.methodIcon}>🏦</span>
          <span>Bank Transfer</span>
        </button>
      </div>

      <div className={styles.buyTokenSelect}>
        <label>Buy Token</label>
        <select className={styles.tokenSelect}>
          <option value="ETH">ETH - Ethereum</option>
          <option value="USDC">USDC - USD Coin</option>
          <option value="DEGEN">DEGEN</option>
          <option value="cbBTC">cbBTC</option>
        </select>
      </div>

      <button className={styles.buyButton}>
        Continue to Payment
      </button>

      <p className={styles.buyNote}>
        Minimum purchase: $5 | Fees: ~2%
      </p>
    </div>
  );
}

// Portfolio Component
function PortfolioInterface() {
  const { address } = useAccount();
  
  const holdings = [
    { symbol: "ETH", name: "Ethereum", balance: 0, price: 3241 },
    { symbol: "USDC", name: "USD Coin", balance: 0, price: 1 },
    { symbol: "DEGEN", name: "Degen", balance: 0, price: 0.0419 },
    { symbol: "cbBTC", name: "cbBTC", balance: 0, price: 88345 },
  ];

  const totalValue = holdings.reduce((acc, h) => acc + h.balance * h.price, 0);

  return (
    <div className={styles.portfolioInterface}>
      <div className={styles.portfolioHeader}>
        <h3>Your Portfolio</h3>
        <div className={styles.totalValue}>
          <span className={styles.valueLabel}>Total Value</span>
          <span className={styles.valueAmount}>${totalValue.toLocaleString()}</span>
        </div>
      </div>

      {!address ? (
        <div className={styles.connectPrompt}>
          <p>🔒 Connect wallet to view your holdings</p>
        </div>
      ) : (
        <div className={styles.holdingsList}>
          {holdings.map(token => (
            <div key={token.symbol} className={styles.holdingItem}>
              <div className={styles.holdingLeft}>
                <span className={styles.holdingSymbol}>{token.symbol}</span>
                <span className={styles.holdingName}>{token.name}</span>
              </div>
              <div className={styles.holdingRight}>
                <span className={styles.holdingBalance}>
                  {token.balance.toFixed(token.decimals || 4)} {token.symbol}
                </span>
                <span className={styles.holdingValue}>
                  ${(token.balance * token.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.portfolioActions}>
        <button className={styles.portfolioAction}>
          <span>📤</span> Send
        </button>
        <button className={styles.portfolioAction}>
          <span>📥</span> Receive
        </button>
        <button className={styles.portfolioAction}>
          <span>🔄</span> Bridge
        </button>
      </div>
    </div>
  );
}

type Tab = "swap" | "buy" | "portfolio";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("swap");

  // Market data
  const marketData = [
    { symbol: "cbBTC", price: "$88,345", change: "+0.14%", positive: true },
    { symbol: "ETH", price: "$3,241", change: "+1.23%", positive: true },
    { symbol: "USDC", price: "$1.00", change: "0.00%", positive: true },
    { symbol: "DEGEN", price: "$0.0419", change: "-4.39%", positive: false },
    { symbol: "VIRTUAL", price: "$0.807", change: "-0.36%", positive: false },
    { symbol: "CLAWD", price: "$0.0002", change: "-6.19%", positive: false },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <WalletButton />
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
            🔄 Swap
          </button>
          <button
            className={`${styles.tab} ${activeTab === "buy" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("buy")}
          >
            💳 Buy
          </button>
          <button
            className={`${styles.tab} ${activeTab === "portfolio" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            💼 Portfolio
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "swap" && <SwapInterface />}
          {activeTab === "buy" && <BuyInterface />}
          {activeTab === "portfolio" && <PortfolioInterface />}
        </div>

        {/* Market Data */}
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

        {/* Info Cards */}
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