"use client";

import React, { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

import type { ArticleType } from "@/types";
import Link from "next/link";

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
    <main className="flex flex-col justify-between h-screen">
      <div>
        <Navigation />
        <div className="mt-28 lg:mt-32 w-5/6 max-w-5xl mx-auto">
          {/* <div className="relative mt-1 mb-5">
            <iframe
              src="//a.magsrv.com/iframe.php?idzone=5571162&size=300x250"
              className="object-contain"
            ></iframe>
            <p className="absolute top-0 left-2 font-bold">Ads</p>
          </div> */}
        </div>
        <Articles
          articles={[...articles].reverse().slice(0, 3)}
          title="Newly Updated"
        />
        <div>
          <Articles
            articles={
              // Pass 3 articles for large screen and 4 articles for small screen
              innerWidth && innerWidth < 800
                ? articles.slice(0, 4)
                : articles.slice(0, 3)
            }
            title="Older videos"
            wrap
          />
          <div className="mt-2 w-5/6 max-w-5xl mx-auto py-3 rounded-full bg-[#1d071b]">
            <Link
              href={"/all-videos"}
              className="block w-full text-[#fff] text-base lg:text-lg text-center hover:font-bold"
            >
              See more videos
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
