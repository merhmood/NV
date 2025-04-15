"use client";

import Script from "next/script";

const VideoSliderAds = () => {
  return (
    <>
      <Script
        id="ads-video-slider"
        src="https://a.magsrv.com/ad-provider.js"
      ></Script>
      <ins className="eas6a97888e31" data-zoneid="5586588"></ins>
      <Script id="serve-ads-slider">{`(AdProvider = window.AdProvider || []).push({"serve": {}})`}</Script>
      <Script />
    </>
  );
};

export default VideoSliderAds;
