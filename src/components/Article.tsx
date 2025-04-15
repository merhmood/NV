"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

import { ArticleType } from "@/types";
import jaccardSimilarity from "@/utils/jaccardSimilarity";
import fluidPlayer from "fluid-player";
import ArticleItem from "./ArticleItem";
import BannerAds from "./BannerAds";
import Loader from "./Loader";
import { CDN_URL } from "@/url";

const Article = () => {
  const id = usePathname().split("/")[2]; // extracts article id from url path;
  const [article, setArticle] = useState<ArticleType>();
  const [moreArticles, setMoreArticles] = useState<ArticleType[]>();
  const adsCounter = [1, 2];

  let self = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (article) {
      videoPlayerSetup(self, article);
    }
  });

  useEffect(() => {
    const innerWidth = window.innerWidth;
    articleFetch(id, setMoreArticles, setArticle, innerWidth);
    window.scrollTo({ top: 0 });
  }, [id]);

  return article ? (
    <section className="flex flex-col-reverse h-fit lg:gap-10 lg:flex-row lg:justify-between mt-36 lg:mt-32">
      <div className="basis-4/5">
        <Suspense fallback={<div className="my-10">Loading Article</div>}>
          <h2 className="mt-2 lg:mb-2 text-base lg:text-2xl font-semibold">
            {article?.title}
          </h2>
          <div className="flex flex-wrap w-fit my-2 gap-1 lg:gap-2 lg:mb-4 ">
            {article && article.tags.length > 0
              ? article.tags.map((value, index) => (
                  <p
                    key={index}
                    className="bg-gray-100 text-black px-2 py-1 text-xs lg:text-base rounded-md"
                  >
                    {value}
                  </p>
                ))
              : "Unknown"}
          </div>
          <div className="w-full">
            {article && (
              <video ref={self} className="w-full">
                <source
                  src={`${CDN_URL}/${article.video}`}
                  data-fluid-hd
                  title={article.title}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className="w-fit px-3 py-1 bg-[#611364] text-[#fff] lg:mt-3 lg:mb-4">
            Model(s):{" "}
            {article && article.creators.length > 0
              ? article.creators.map(
                  (value, index) =>
                    `${value}${index < article.creators.length - 1 ? ", " : ""}`
                )
              : "Unknown"}
          </div>
        </Suspense>
        <div className="mt-2 w-full">
          <h3 className="mb-2">More Videos for you</h3>
          <div className="overflow-x-scroll lg:overflow-hidden article-scroll">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {moreArticles &&
                moreArticles.length > 0 &&
                moreArticles.map((article, index) => (
                  <ArticleItem key={index} article={article} />
                ))}
            </div>
          </div>
        </div>
        <BannerAds />
      </div>
      <div className="basis-1/5 mb-5 lg:mb-0">
        <BannerAds />
        {adsCounter.map((_, index) => (
          <div key={index} className="hidden lg:block">
            <BannerAds />
          </div>
        ))}
      </div>
    </section>
  ) : (
    <div className="flex justify-center mt-44">
      <Loader />
    </div>
  );
};

export default Article;

function videoPlayerSetup(
  self: React.RefObject<HTMLVideoElement>,
  article: ArticleType
) {
  let player: FluidPlayerInstance | null = null;

  if (!player) {
    if (self.current) {
      player = fluidPlayer(self.current, {
        layoutControls: {
          primaryColor: "#ff99f3",
          posterImage: `${CDN_URL}/${article?.thumbnail}`,
        },
        vastOptions: {
          adList: [
            {
              roll: "preRoll",
              vastTag: "https://s.magsrv.com/v1/vast.php?idzone=5581748",
            },
          ],
        },
      });
    }
  }
}

function articleFetch(
  id: string,
  setMoreArticles: React.Dispatch<
    React.SetStateAction<ArticleType[] | undefined>
  >,
  setArticle: React.Dispatch<React.SetStateAction<ArticleType | undefined>>,
  innerWidth: number
) {
  // Request articles and filter out the article chosen to read
  (async () => {
    const data = await fetch("/data.json");
    const response: { articles: ArticleType[] } = await data.json();
    const article: ArticleType[] = response.articles.filter(
      (article: ArticleType) => article.id === id
    );

    // Get similar articles to clicked article
    const moreArticles: ArticleType[] = [];
    for (let i = 0; i < response.articles.length - 1; i++) {
      if (moreArticles.length < 3) {
        const similarity = jaccardSimilarity(
          [...article[0].tags, ...article[0].creators],
          [...response.articles[i].tags, ...response.articles[i].creators]
        );
        if (similarity >= 0.3 && similarity !== 1) {
          moreArticles.push(response.articles[i]);
        }
      } else {
        break;
      }
    }

    setMoreArticles(
      innerWidth < 800 ? moreArticles.slice(0, 3) : moreArticles.splice(0, 7)
    );
    setArticle(article[0]);
  })();
}
