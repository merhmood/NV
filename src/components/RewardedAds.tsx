import React, { useEffect, useState } from "react";
import createAdHandler from "monetag-tg-sdk";
import { updateCooldown, getCooldownRemaining } from "@/utils/adUtils";
import axios from "axios";
import { API_URL } from "@/url";

const showAd = createAdHandler(9607234);

const RewardedAds = ({ userID }: { userID?: number }) => {
  const [loading, setLoading] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(
    getCooldownRemaining()
  );
  const [adCount, setAdCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldownRemaining(getCooldownRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAd = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/ad-view`, { uid: userID });
      if (res.data.allowed) {
        showAd().then(() => {
          updateCooldown();
          setAdCount(res.data.totalViews);
          setCooldownRemaining(15); // Start cooldown UI
        });
      } else {
        alert("You’ve reached your daily limit of 10 ads.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong showing the ad.");
    }
    setLoading(false);
  };
  return (
    <div className="bg-[#ac3fa3] font-normal rounded-lg p-4 mt-4">
      <div>
        <h2 className="text-lg">
          Earn <span className="font-bold text-yellow-400">10</span> coins
          reward
        </h2>
        <p className="text-sm">
          <span className="font-bold">{adCount}/10</span> ads viewed today
        </p>
      </div>
      <button
        onClick={handleAd}
        disabled={!userID || loading || cooldownRemaining > 0}
        className={`mt-3 bg-white text-black w-full py-2 rounded-lg font-bold ${
          loading || cooldownRemaining > 0
            ? "opacity-70 cursor-not-allowed"
            : ""
        }`}
      >
        {cooldownRemaining > 0 ? `Wait ${cooldownRemaining}s` : "Watch Ad"}
      </button>
      <button
        disabled={loading || cooldownRemaining > 0}
        onClick={handleAd}
      ></button>
    </div>
  );
};

export default RewardedAds;
