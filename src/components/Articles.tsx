"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { ArticleType } from "@/types";
import ArticleItem from "./ArticleItem";
import BannerAds from "./BannerAds";
import Loader from "./Loader";
import Offline from "./Offline";
import Pagination from "./Pagination";

interface ArticlesProp {
  articles: ArticleType[];
  title?: string;
  wrap?: boolean;
  ads?: number;
  showAll?: boolean;
  showLoader?: boolean;
  finishLoading?: boolean;
}

const Articles = ({
  articles,
  title,
  wrap,
  ads,
  showAll,
  showLoader,
  finishLoading,
}: ArticlesProp) => {
  const [offline, setOffline] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0); // Adjust as needed

  useEffect(() => {
    offlineHandler(setOffline);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  useEffect(() => {
    if (wrap && !showAll) {
      innerWidth > 800 ? setItemsPerPage(10) : setItemsPerPage(8);
    } else if (title === "New Videos") {
      setItemsPerPage(8);
    } else {
      innerWidth > 800 ? setItemsPerPage(12) : setItemsPerPage(6);
    }
  }, [showAll, wrap, title]);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    console.log(itemsPerPage);
  });

  return articles && articles.length > 0 && finishLoading ? (
    <section className="mb-10 lg:mb-8">
      <h2 className=" mb-4 text-lg lg:text-2xl font-semibold">{title}</h2>
      <div className="w-full overflow-x-scroll lg:overflow-hidden article-scroll">
        {" "}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}>
          {paginatedArticles.map((article, index) => (
            <React.Fragment key={index}>
              <ArticleItem article={article} />
              {index + 1 === ads && wrap && (
                <div className="col-span-2 md:col-span-3 lg:col-span-4 relative w-full mb-5">
                  <BannerAds />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {
        /* Pagination Controls */
        showAll && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )
      }
      {wrap && !showAll && (
        <div className="mt-4 py-3 rounded-full bg-[#6d2867]">
          <Link
            href={"/videos"}
            className="block w-full text-[#fff] text-base lg:text-lg text-center hover:font-bold"
          >
            See more
          </Link>
        </div>
      )}
    </section>
  ) : articles.length <= 0 && finishLoading ? (
    <p className="text-center">
      Sorry no video, try searching for something else 😅
    </p>
  ) : !offline ? (
    showLoader && <Loader />
  ) : (
    <Offline />
  );
};

function offlineHandler(
  setOffline: React.Dispatch<React.SetStateAction<boolean>>
): React.EffectCallback {
  return () => {
    // Handles network state accordingly
    window.addEventListener("offline", () => {
      setOffline(true);
    });
    window.addEventListener("online", () => {
      setOffline(false);
    });
    return () => {
      window.removeEventListener("offline", () => setOffline(true));
      window.removeEventListener("online", () => setOffline(false));
    };
  };
}

export default Articles;
