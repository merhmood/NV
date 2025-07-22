"use client";

import Link from "next/link";
import Image from "next/image";

import { ollifiaPoettry } from "@/utils/font";

const Navigation: React.FC = () => {
  return (
    <header className="bg-[#181717a1] backdrop-blur-lg sticky top-0 w-full z-10 pb-2">
      <section className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-7 pb-2 lg:pb-3 mx-auto max-w-6xl">
        <div className="flex items-center">
          <div className="absolute h-11 w-11 lg:h-14 lg:w-14 justify-center ml-5 z-40">
            <Image
              alt="logo"
              src="/bg-image.png"
              fill
              className="rounded-full"
              objectFit="cover"
            />
          </div>
          <h2 className={`text-white text-center text-xl lg:text-3xl w-full`}>
            <span className="font-bold ml-3">Wallet</span>
          </h2>
        </div>
      </section>
    </header>
  );
};

export default Navigation;
