"use client";

import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
        <div className="flex justify-between text-lg border border-gray-400 p-6 mb-4 rounded-2xl backdrop-blur-md bg-gray-900/20">
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
        <div className="flex justify-between text-lg border border-gray-500 p-6 mb-4 rounded-2xl backdrop-blur-md bg-gray-900/20">
          <div>
            Gem balance:{" "}
            <span className="text-purple-500 block text-5xl mt-2 font-medium">
              20
            </span>
          </div>
          <div className="flex flex-col-reverse">
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/gem.png" alt="coin" fill />
            </div>
          </div>
        </div>
        <div>
          <button className="w-full text-lg border border-green-500 p-1.5 rounded-lg backdrop-blur-md bg-green-600/30 mb-1 mt-4">
            Top Up
          </button>
          <p className="mt-1 font-light text-sm">
            Note: You can only <span className="font-bold">Top Up</span> Coins
            with Ads.
          </p>
        </div>
      </div>
    </main>
  );
}
