import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { ArticleType, Props } from "@/types";

import Article from "@/components/Article";
import { API_URL } from "@/url";

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const data = await fetch(`${API_URL}/data.json`);
  const response: { articles: [] } = await data.json();
  const article: ArticleType[] = response.articles.filter(
    (article: ArticleType) => article.id === id
  ); // extracts the article based on the article id;
  return {
    title: article[0] ? article[0].title : `${article}`,
    keywords: article[0] ? [...article[0].tags, ...article[0].creators] : [],
    description: article[0] ? article[0].description : "",
    icons: "/logo.jpg",
    twitter: {
      card: "player",
      title: article[0] ? article[0].title : "",
      description: article[0] ? article[0].description : "",
      images: "/logo.jpg",
      players: [
        {
          streamUrl: `/${article[0].video}`,
          playerUrl: `/videos/${id}`,
          width: 640,
          height: 360,
        },
      ],
    },
    openGraph: {
      title: article[0] ? article[0].title : "",
      description: article[0] ? article[0].description : "",
      url: `/videos/${id}`,
    },
  };
}

export default function page({ params, searchParams }: Props) {
  return (
    <main>
      <div>
        <Article />
      </div>
    </main>
  );
}
