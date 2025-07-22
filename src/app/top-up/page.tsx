import Image from "next/image";
import React from "react";

export default function TopUp() {
  return (
    <main className="text-white">
      <h2 className="mt-2 text-xl">Top up</h2>
      <div className="bg-[#ac3fa3] rounded-lg p-4 mt-4">
        <div>
          <h2 className="font-bold text-2xl">Earn Coins</h2>
          <p className="text-sm">Ads resets at 00:00</p>
        </div>
        <button className="mt-3 bg-white text-black w-full py-2 rounded-lg font-bold">
          Watch Ad (0/15)
        </button>
      </div>
      <div>
        <button className="flex justify-center items-center mt-3 border border-yellow-600 bg-white text-black w-full py-2 rounded-lg font-medium">
          Buy Coins{" "}
          <span className="block relative w-6 h-6 ml-2">
            <Image src="/coins-top-up.png" alt="coins top up" fill />
          </span>
        </button>
        <button className="flex justify-center items-center mt-3 border border-purple-600 bg-white text-black w-full py-2 rounded-lg font-medium">
          Buy Gems
          <span className="block relative w-6 h-6 ml-2">
            <Image src="/gems-top-up.png" alt="coins top up" fill />
          </span>
        </button>
      </div>
      <div className="mt-4 text-lg">Transaction History</div>
    </main>
  );
}
