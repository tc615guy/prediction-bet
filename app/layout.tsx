import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://prediction.bet"),
  title: "Prediction.bet — Own the Future of Prediction",
  description:
    "The category-defining brand for prediction markets, decentralized betting, and AI forecasting.",
  openGraph: {
    title: "Prediction.bet — Own the Future of Prediction",
    description:
      "The category-defining brand for prediction markets, decentralized betting, and AI forecasting.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prediction.bet — Own the Future of Prediction",
    description:
      "The category-defining brand for prediction markets, decentralized betting, and AI forecasting.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
