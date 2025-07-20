"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { ollifiaPoettry } from "@/utils/font";

const Navigation: React.FC = () => {
  const searchParams = useSearchParams();
  const video = searchParams.get("video");

  const [searchValue, setSearchValue] = useState<string>(
    video ? (video as string) : ""
  );

  const handleSearchWithEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (searchValue !== "") {
      if (e.key === "Enter") {
        window.location.href = `/videos?video=${fixSearchValue(searchValue)}`;
      }
    }
  };

  const handleSearchWithSearchIcon = () => {
    if (searchValue !== "")
      window.location.href = `/videos?video=${fixSearchValue(searchValue)}`;
  };

  const fixSearchValue = (searchValue: string) =>
    searchValue.trim().replaceAll(" ", "+");

  return (
    <header className="bg-[#181717a1] backdrop-blur-lg sticky top-0 w-full z-10 pb-2">
      <section className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-center mt-7 pb-2 lg:pb-3 mx-auto max-w-6xl">
        <div className="flex items-center">
          <div className="relative h-12 w-12 lg:h-14 lg:w-14 justify-center">
            <Image
              alt="logo"
              src="/bg-image.png"
              fill
              className="rounded-full"
              objectFit="cover"
            />
          </div>
          <h2
            className={`${ollifiaPoettry.className} text-white text-2xl lg:text-3xl text-left`}
          >
            <Link href="/">
              <span className=" text-[#ac3fa3]">Nutty</span>Vibes
            </Link>
          </h2>
        </div>
        <div className="relative flex justify-center mt-3 lg:-mt-2 w-5/6 lg:w-3/6">
          <input
            type="text"
            className="block py-2 pl-10 lg:pl-6 pr-3 bg-white/15 rounded-full text-sm lg:text-base w-full border-none outline-none focus:outline-[#ac3fa3]"
            placeholder="Search Videos"
            onKeyDown={handleSearchWithEnterKey}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <div onClick={handleSearchWithSearchIcon} className="cursor-pointer">
            <div className="lg:hidden absolute flex items-center h-full left-3">
              <div className="relative h-4 w-4 lg:h-5 lg:w-5 mr-2">
                <Image src="/search.png" alt="search" objectFit="cover" fill />
              </div>
            </div>
            <div className="hidden lg:flex absolute items-center h-full right-3">
              <div className="relative h-4 w-4 lg:h-5 lg:w-5 mr-2">
                <Image src="/search.png" alt="search" objectFit="cover" fill />
              </div>
            </div>
          </div>
        </div>
        {/* Keeps the input in middle */}
        <div></div>
      </section>
    </header>
  );
};

export default Navigation;
