"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { ollifiaPoettry } from "@/utils/font";

const Navigation: React.FC = () => {
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
      </section>
    </header>
  );
};

export default Navigation;
