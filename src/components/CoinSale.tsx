import Image from "next/image";
import { SetStateAction } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">

import "react-spring-bottom-sheet/dist/style.css";

const coins = [
  { amount: 100, price: 1.99 },
  { amount: 500, price: 8.99 },
  { amount: 1000, price: 15.99 },
  { amount: 2000, price: 18.99 },
];

const CoinSale = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
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
}: {
  amount: number;
  price: number;
}) => {
  return (
    <button className="flex flex-col justify-center items-center border border-yellow-500 p-3 rounded-xl font-medium">
      <div className="relative w-9 h-9 mr-2">
        <Image src="/coin.png" alt="buy coins" fill />
      </div>
      <span className="block">Buy {amount} Coins</span>
      <span className="block text-right text-sm text-gray-500">${price}</span>
    </button>
  );
};
export default CoinSale;
