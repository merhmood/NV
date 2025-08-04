import React, { SetStateAction, useEffect, useState } from "react";
import createAdHandler from "monetag-tg-sdk";
import axios from "axios";
import { API_URL } from "@/url";
import {
  canShowAd,
  getCooldownRemaining,
  updateCooldown,
  COOLDOWN_SECONDS,
} from "@/utils/adUtils";

const showAd = createAdHandler(9607234);

const RewardedAds: React.FC<{
  adCount: number;
  userID?: number;
  onCoinBalance: React.Dispatch<SetStateAction<string>>;
}> = ({ userID, adCount, onCoinBalance }) => {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [adCounter, setAdCounter] = useState(0);

  // Initialize ad counter from props
  useEffect(() => {
    setAdCounter(adCount);
  }, [adCount]);

  // Poll cooldown every second
  useEffect(() => {
    let id: number;
    async function tick() {
      const cd = await getCooldownRemaining();
      setCooldown(cd);
      id = window.setTimeout(tick, 500);
    }
    tick();
    return () => clearTimeout(id);
  }, []);

  const handleAd = async () => {
    if (!userID) return;
    if (!(await canShowAd())) return;

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/ad-view`, { uid: userID });

      if (res.data.allowed) {
        // Show the ad inside the Mini App
        await showAd();

        await updateCooldown(); // save timestamp
        setAdCounter(res.data.totalViews);
        setCooldown(COOLDOWN_SECONDS);
        onCoinBalance(res.data.coins);
      } else {
        alert("🎯 You’ve reached your daily limit of 10 ads.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to display ad or call backend.");
    } finally {
      setLoading(false);
    }
  };

  // You may fetch initial adCount on mount
  useEffect(() => {
    (async () => {
      if (userID) {
        try {
          const response = await axios.get(`${API_URL}/ad-status/${userID}`);
          setAdCounter(
            response.data.viewsLeft ? 10 - response.data.viewsLeft : 0
          );
        } catch {}
      }
    })();
  }, [userID]);

  return (
    <div className="bg-[#ac3fa3] rounded-lg p-4 mt-4">
      <h2 className="text-lg">
        Earn <span className="font-bold text-yellow-400">10</span> coins
      </h2>
      <p className="text-sm">
        <span className="font-bold">{adCounter}/10</span> ads viewed today
      </p>
      <button
        onClick={handleAd}
        disabled={!userID || loading || cooldown > 0}
        className={`mt-3 w-full py-2 rounded-lg font-bold ${
          loading || cooldown > 0
            ? "opacity-70 cursor-not-allowed"
            : "bg-white text-black"
        }`}
      >
        {cooldown > 0 ? `Wait ${cooldown}s` : loading ? "Loading…" : "Watch Ad"}
      </button>
    </div>
  );
};

export default RewardedAds;
