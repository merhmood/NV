"use client";

import React, { useEffect, useState } from "react";
import { init } from "@telegram-apps/sdk-react";
import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import CoinSale from "@/components/CoinSale";
import TransactionHistory from "@/components/TransactionHistory";
import { API_URL } from "@/url";

const RewardedAds = dynamic(() => import("@/components/RewardedAds"), {
  ssr: false,
});

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  languageCode: string;
  isPremium: boolean;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [openCoinSale, setOpenCoinSale] = useState(false);
  const [coinsBalance, setCoinsBalance] = useState("****");

  useEffect(() => {
    // Initialize SDK
    init();

    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setUser({
        firstName: user.first_name,
        id: user.id,
        isPremium: user.is_premium,
        languageCode: user.language_code,
        lastName: user.last_name,
        userName: user.username,
      } as User);
    }
  }, []);

  useEffect(() => {
    const fetchCoinsBalance = async () => {
      if (user) {
        try {
          const response = await fetch(`${API_URL}/get-coins/${user.id}`);
          const data = await response.json();
          setCoinsBalance(data.balance);
        } catch (error) {
          console.error("Failed to fetch coins balance:", error);
        }
      }
    };
    fetchCoinsBalance();
  }, [user]);

  return (
    <main className="text-white">
      <div>
        <h1 className="text-xl mb-4 mt-2">
          Welcome {user ? user.firstName : ""}
        </h1>
        <div className="flex justify-between text-lg border border-[#ac3fa3] p-6 mb-4 rounded-2xl backdrop-blur-md bg-gray-900/20">
          <div>
            Coins balance:{" "}
            <span className="text-yellow-400 block text-5xl mt-2 font-medium">
              {coinsBalance}
            </span>
          </div>
          <div className="flex flex-col-reverse">
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/coin.png" alt="coin" fill />
            </div>
          </div>
        </div>
        <RewardedAds userID={user?.id} onCoinBalance={setCoinsBalance} />
        <div>
          <button
            onClick={() => setOpenCoinSale(true)}
            className="flex justify-center items-center mt-3 border border-yellow-400 bg-white text-black w-full py-2 rounded-lg font-medium"
          >
            Buy Coins{" "}
            <span className="block relative w-6 h-6 ml-2">
              <Image src="/coins-top-up.png" alt="coins top up" fill />
            </span>
          </button>
        </div>
        <TransactionHistory />
        <div className="fixed bottom-4 flex text-sm mt-4 gap-4 text-gray-400">
          <Link href="#">Refund policy</Link>
          <Link href="#">Terms of use</Link>
        </div>
        <CoinSale
          open={openCoinSale}
          onOpenCoinSale={setOpenCoinSale}
          userID={user?.id}
          onCoinBalance={setCoinsBalance}
        />
      </div>
    </main>
  );
}
