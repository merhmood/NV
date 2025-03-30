"use client";

import React, { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

import type { ArticleType } from "@/types";
import BannerAds from "@/components/BannerAds";

export default function Page() {
  const [articles, setArticles] = useState<Array<ArticleType>>([]);
  const [innerWidth, setInnerWidth] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data and set them in reverse order, also handles
    // rendering the first set of articles to the screen
    (async () => {
      const data = await fetch("/data.json");
      const response: { articles: [] } = await data.json();
      setArticles(response.articles);
    })();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);

      const handleResize = () => setInnerWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <main>
      <div className="mt-36 lg:mt-32"></div>
      <BannerAds />
      <Articles
        articles={[...articles].reverse().slice(0, 4)}
        title="New Videos"
        showLoader
      />
      <Articles
        articles={
          // Pass 3 articles for large screen and 4 articles for small screen
          innerWidth && innerWidth < 800
            ? [...articles].sort((a, b) => 0.5 - Math.random()).slice(0, 8)
            : [...articles].sort((a, b) => 0.5 - Math.random()).slice(0, 10)
        }
        ads={innerWidth && innerWidth < 800 ? 6 : 8}
        title="More videos"
        wrap
      />
    </main>
  );
}
