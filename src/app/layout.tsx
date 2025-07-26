import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

import { satoshi } from "@/utils/font";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TWAWrapper = dynamic(() => import("@/components/TWAWrapper"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Nutty Vibes",
  description: "Best website for your amazing Adult content",
  icons: "/logo.jpg",
  twitter: {
    images: "/logo.jpg",
    card: "summary_large_image",
    site: "@nutty_vibes",
    creator: "@nutty_vibes",
    description: "Best website for your amazing Adult content",
    title: "Nutty Vibes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        
        <Script
          src="//libtl.com/sdk.js"
          data-zone="9607234"
          data-sdk="show_9607234"
          strategy="afterInteractive"
        />
      </head> */}
      <body className={`${satoshi.className}`}>
        <Suspense>
          <TWAWrapper>
            <Navigation />
            <div className="w-11/12 lg:w-5/6 max-w-5xl mx-auto">{children}</div>
            <Footer />
          </TWAWrapper>
        </Suspense>
      </body>
      <GoogleAnalytics gaId="G-796EYQTS8W" />
    </html>
  );
}
