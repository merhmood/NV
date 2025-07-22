"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Footer = () => {
  const path = usePathname();
  const isTopUpPage = path === "/top-up";

  return (
    <footer className="border-t border-gray-600 text-white fixed bottom-0 w-full ">
      <div className="flex w-4/12 mx-auto justify-between items-center py-2">
        <Link href="/">
          <div
            className={`${!isTopUpPage && "bg-gray-500/15"} rounded-full p-2`}
          >
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/home.png" alt="home" fill />
            </div>{" "}
          </div>
        </Link>
        <Link href="/top-up">
          <div
            className={`${isTopUpPage && "bg-gray-500/15"} rounded-full p-2`}
          >
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/top-up.png" alt="top-up" fill />
            </div>{" "}
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
