"use client";

import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import createAdHandler from "monetag-tg-sdk";

import CoinSale from "@/components/CoinSale";
import TransactionHistory from "@/components/TransactionHistory";

const showAd = createAdHandler(9607234);

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

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUser({
        firstName: WebApp.initDataUnsafe.user.first_name,
        id: WebApp.initDataUnsafe.user.id,
        isPremium: WebApp.initDataUnsafe.user.is_premium,
        languageCode: WebApp.initDataUnsafe.user.language_code,
        lastName: WebApp.initDataUnsafe.user.last_name,
        userName: WebApp.initDataUnsafe.user.username,
      } as User);
    }
  }, []);
  return (
    <main className="text-white">
      <div>
        <h1 className="text-xl mb-4 mt-2">
          Welcome {user ? user.firstName : ""}
        </h1>
        <div className="flex justify-between text-lg border border-[#ac3fa3] p-6 mb-4 rounded-2xl backdrop-blur-md bg-gray-900/20">
          <div>
            Coin balance:{" "}
            <span className="text-yellow-400 block text-5xl mt-2 font-medium">
              1000
            </span>
          </div>
          <div className="flex flex-col-reverse">
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/coin.png" alt="coin" fill />
            </div>
          </div>
        </div>
        <div className="bg-[#ac3fa3] rounded-lg p-4 mt-4">
          <div>
            <h2 className="font-bold text-lg">
              Earn <span className="text-yellow-400">10</span> coins reward
            </h2>
            <p className="text-sm">Ads resets at 00:00</p>
          </div>
          <button
            onClick={() =>
              showAd().then(() => {
                console.log("ad shown");
              })
            }
            className="mt-3 bg-white text-black w-full py-2 rounded-lg font-bold"
          >
            Watch Ad (0/10)
          </button>
        </div>
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
        <CoinSale open={openCoinSale} setOpen={setOpenCoinSale} />
      </div>
    </main>
  );
}
