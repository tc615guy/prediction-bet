import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F3SRH8DRBZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3SRH8DRBZ');
          `}
        </Script>
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
