"use client";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

// Dynamic import to avoid hydration mismatch
const Wallet = dynamic(
  () => import("@coinbase/onchainkit/wallet").then((mod) => mod.Wallet),
  { ssr: false }
);

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.headerWrapper}>
        <Wallet />
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>Base Trading App</h1>
        
        <p>Your crypto trading hub on Base</p>
        
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a 
            href="https://docs.base.org/onchainkit/swap/swap" 
            target="_blank" 
            rel="noreferrer"
            style={{ padding: "0.75rem 1.5rem", background: "#0052FF", color: "white", borderRadius: "8px", textDecoration: "none" }}
          >
            Swap Tokens
          </a>
          <a 
            href="https://docs.base.org/onchainkit/buy/buy" 
            target="_blank" 
            rel="noreferrer"
            style={{ padding: "0.75rem 1.5rem", background: "#0052FF", color: "white", borderRadius: "8px", textDecoration: "none" }}
          >
            Buy Crypto
          </a>
        </div>
      </div>
    </div>
  );
}