import React from "react";
import createAdHandler from "monetag-tg-sdk";

const showAd = createAdHandler(9607234);

const RewardedAds = () => {
  return (
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
  );
};

export default RewardedAds;
