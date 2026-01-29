import type { Metadata } from "next";
import { RootProvider } from "./rootProvider";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base Trading App",
  description: "Crypto trading mini app on Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}