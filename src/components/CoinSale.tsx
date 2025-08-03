import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import {
  init,
  openTelegramLink,
  invoice,
  initData,
} from "@telegram-apps/sdk-react";

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">

import "react-spring-bottom-sheet/dist/style.css";
import axios from "axios";
import { API_URL } from "@/url";
import { on } from "events";

const coins = [
  { amount: 500, price: 1.99, star: 100 },
  { amount: 1250, price: 4.99, star: 250 },
  { amount: 2750, price: 9.99, star: 500 },
  { amount: 5500, price: 19.99, star: 1000 },
];

const CoinSale = ({
  open,
  onOpenCoinSale,
  userID,
  onCoinBalance,
}: {
  open: boolean;
  onOpenCoinSale: React.Dispatch<SetStateAction<boolean>>;
  onCoinBalance: React.Dispatch<SetStateAction<string>>;
  userID?: number;
}) => {
  useEffect(() => {
    if (userID) {
      // Initialize SDK
      init();
    }
  }, [userID]);

  const handleBuy = async (
    amount: number,
    star: number,
    price: number,
    userID?: number
  ) => {
    try {
      const payload = `mini_${Date.now()}_${userID}_${amount}`;
      const res = axios.post(`${API_URL}/invoice-link`, {
        payload,
        amount: star,
        title: `${amount} coins for $${price}`,
        description: "Star purchase for Nutt and Vibes app coins",
      });

      const { invoiceLink } = (await res).data;
      console.log(invoiceLink);
      if (invoice.isSupported() && invoice.open.isAvailable()) {
        const res = await invoice.open(invoiceLink, "url");
        if (res == "success") {
          onCoinBalance((prev) => {
            const newBalance = parseInt(prev) + amount;
            return newBalance.toString();
          });
          onOpenCoinSale(false);
          alert("✅ Coins purchased successfully!");
        } else {
          alert("❌ Payment was not completed.");
        }
      } else {
        openTelegramLink(invoiceLink);
      }
    } catch (error) {
      console.error(error);
      alert("Error during purchase.");
    }
  };
  return (
    <>
      <BottomSheet onDismiss={() => onOpenCoinSale(false)} open={open}>
        <div className="text-white">
          <div className="px-4 text-center py-2">
            <h2 className="text-lg font-bold mb-2">Buy Coins</h2>
            <p className="text-sm mb-4">
              Choose a package to buy coins. Your balance will be updated
              immediately after purchase.
            </p>
          </div>
          <div className="px-4 grid grid-cols-2 mb-6 gap-2 text-white">
            {coins.map((coin) => (
              <CoinSaleButton
                key={coin.amount}
                amount={coin.amount}
                price={coin.price}
                onBuy={() =>
                  handleBuy(coin.amount, coin.star, coin.price, userID)
                }
              />
            ))}
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

const CoinSaleButton = ({
  amount,
  price,
  onBuy,
}: {
  amount: number;
  price: number;
  onBuy: () => void;
}) => {
  return (
    <button
      onClick={onBuy}
      className="flex flex-col justify-center items-center border border-yellow-500 p-3 rounded-xl font-medium"
    >
      <div className="relative w-9 h-9 mr-2">
        <Image src="/coin.png" alt="buy coins" fill />
      </div>
      <span className="block">Buy {amount} Coins</span>
      <span className="block text-right text-sm text-gray-500">${price}</span>
    </button>
  );
};

export default CoinSale;
