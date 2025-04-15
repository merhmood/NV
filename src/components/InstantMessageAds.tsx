import React from "react";
import Script from "next/script";

const InstantMessageAds = () => {
  return (
    <>
      <Script
        id="ads-video-slider"
        src="https://a.magsrv.com/ad-provider.js"
      ></Script>
      <ins className="eas6a97888e6" data-zoneid="5586602"></ins>
      <Script id="serve-ads-slider">{`(AdProvider = window.AdProvider || []).push({"serve": {}})`}</Script>
      <Script />
    </>
  );
};

export default InstantMessageAds;
