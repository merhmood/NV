import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import WebApp from "@twa-dev/sdk";

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">

import "react-spring-bottom-sheet/dist/style.css";
import axios from "axios";

const coins = [
  { amount: 300, price: 1.99, star: 100 },
  { amount: 800, price: 4.99, star: 250 },
  { amount: 1600, price: 9.99, star: 500 },
  { amount: 4000, price: 19.99, star: 1000 },
];

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  languageCode: string;
  isPremium: boolean;
}

const CoinSale = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
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
  const handleBuy = async (amount: number) => {
    const payload = `mini_${Date.now()}_${user?.id}`;
    const res = axios.post("http://localhost:4000/invoice-link", {
      payload,
      amount,
      title: "MiniApp Item",
      description: "With Stars",
    });
    const { invoiceLink } = (await res).data;
    console.log(invoiceLink);
    WebApp.openTelegramLink(invoiceLink);
  };
  return (
    <>
      <BottomSheet onDismiss={() => setOpen(false)} open={open}>
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
                onBuy={() => handleBuy(coin.star)}
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

// const handleBuy = async () => {
//   try {
//     const result = await WebApp.openInvoice();

//     if (result.status !== "success") {
//       alert("Transaction was canceled or failed.");
//       return;
//     }

//     const res = await fetch("http://localhost:3001/api/stars/verify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         initData: WebApp.initData,
//         transactionId: result.transaction_id,
//         payload: result.payload,
//       }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       alert("🎉 Purchase successful and verified!");
//     } else {
//       alert("❌ Verification failed.");
//     }
//   } catch (err) {
//     console.error("Payment error:", err);
//     alert("Error occurred during payment.");
//   }
// };

export default CoinSale;
