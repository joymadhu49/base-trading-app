"use client";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import type { Token } from "@coinbase/onchainkit/token";
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

const swappableTokens: Token[] = [ETHToken, USDCToken, DEGENToken];

export default function Home() {
  const { address } = useAccount();

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
        <p className={styles.subtitle}>Swap tokens instantly on Base</p>

        {address ? (
          <div className={styles.swapContainer}>
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

        <div className={styles.infoCards}>
          <div className={styles.infoCard}>
            <h3>Supported Tokens</h3>
            <ul>
              <li>ETH - Ethereum</li>
              <li>USDC - USD Coin</li>
              <li>DEGEN - Degen</li>
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3>Features</h3>
            <ul>
              <li>✓ Gasless swaps</li>
              <li>✓ Low fees (<$0.01)</li>
              <li>✓ Fast (2s blocks)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}