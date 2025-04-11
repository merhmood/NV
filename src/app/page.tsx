"use client";

import React, { useEffect, useState } from "react";
import Articles from "@/components/Articles";

import type { ArticleType } from "@/types";
import BannerAds from "@/components/BannerAds";

export default function Page() {
  const [finishLoading, setFinishLoading] = useState(false);
  const [articles, setArticles] = useState<Array<ArticleType>>([]);
  const [innerWidth, setInnerWidth] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data and set them in reverse order, also handles
    // rendering the first set of articles to the screen
    (async () => {
      const data = await fetch("/data.json");
      const response: { articles: [] } = await data.json();
      setArticles(response.articles);
      setFinishLoading(true);
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

  const splitedArticles = [...articles];
  splitedArticles.splice(-8);

  return (
    <main>
      <div className="mt-36 lg:mt-32"></div>
      <BannerAds />
      <div className="mt-6"></div>
      <Articles
        articles={[...articles].reverse().slice(0, 8)}
        title="New Videos"
        showLoader
        finishLoading={finishLoading}
      />
      <Articles
        articles={splitedArticles.sort((a, b) => 0.5 - Math.random())}
        ads={innerWidth && innerWidth < 800 ? 6 : 8}
        title="More videos"
        finishLoading={finishLoading}
        wrap
      />
    </main>
  );
}
