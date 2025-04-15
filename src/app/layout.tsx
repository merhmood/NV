import type { Metadata } from "next";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import { satoshi } from "@/utils/font";
import PopUnderAds from "@/components/PopUnderAds";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoSliderAds from "@/components/VideoSliderAds";
import InstantMessageAds from "@/components/InstantMessageAds";

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
      <head>
        <meta
          name="6a97888e-site-verification"
          content="d88d33993212a1703ace3c137f5a2eb8"
        ></meta>
      </head>
      <body
        className={`${satoshi.className} w-full  text-white flex flex-col justify-between h-screen`}
      >
        <Suspense>
          <Navigation />
          <div className="w-11/12 lg:w-5/6 max-w-5xl h-fit mx-auto">
            {children}
          </div>
          <PopUnderAds />
          <VideoSliderAds />
          <InstantMessageAds />
        </Suspense>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-796EYQTS8W" />
    </html>
  );
}
