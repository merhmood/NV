import Image from "next/image";
import Link from "next/link";

import { ArticleType } from "@/types";
import { CDN_URL } from "@/url";

const ArticleItem = ({ article }: { article: ArticleType }) => {
  return (
    <article className={`md:basis-80 shrink-0 grow-0 rounded-lg`}>
      <Link href={`/videos/${article.id}`} className="block">
        <div
          className={`relative rounded-md bg-black h-28 md:h-36 w-full mb-3 `}
        >
          {navigator.onLine && (
            <Image
              alt={article.title}
              src={`${CDN_URL}/${article.thumbnail}`}
              fill
              className={`rounded-md ${
                article.type === "landscape" ? "object-cover" : "object-contain"
              } w-full h-full shadow-[#ac3fa34b] shadow`}
            />
          )}
          <div className="flex text-xs lg:text-sm justify-end absolute top-0 w-full h-full pt-2 pr-2">
            <span className="block bg-[#6d2867]/45 h-fit px-2 py-1 rounded-md">
              {article.quality}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center -mt-1">
          <div
            className={`flex items-center gap-1 text-xs lg:text-sm  text-[#fff]/55`}
          >
            <div className="relative h-3 w-3 lg:h-4 lg:w-4">
              <Image
                src="/duration.png"
                alt={article.title}
                objectFit="cover"
                fill
              />
            </div>
            <p>{article.duration}</p>
          </div>
          <div>
            {article.creators[0] !== "Unavailable" && (
              <p className="text-xs lg:text-sm text-[#fff]/55">
                <span className="text-[#6d2867] mr-0.5">@</span>
                {article.creators[0]}
              </p>
            )}
          </div>
        </div>
        <p
          className={`text-sm lg:text-base hover:font-medium hover:text-[#ac3fa3] mb-2`}
        >
          {article.title}
        </p>
      </Link>
    </article>
  );
};

export default ArticleItem;
