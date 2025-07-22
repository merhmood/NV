"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname();
  return (
    <footer className="border-t border-gray-600 text-white fixed bottom-0 w-full ">
      <div className="flex w-fit mx-auto items-center py-2 gap-4">
        <Link href="/top-up">
          <div
            className={`${
              path === "/top-up" && "bg-gray-500/20"
            } rounded-full p-2`}
          >
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/top-up.png" alt="top-up" fill />
            </div>{" "}
          </div>
        </Link>
        <Link href="/">
          <div
            className={`${path === "/" && "bg-gray-500/20"} rounded-full p-2`}
          >
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/home.png" alt="home" fill />
            </div>{" "}
          </div>
        </Link>
        <Link href="/subscribe">
          <div
            className={`${
              path === "/subscribe" && "bg-gray-500/20"
            } rounded-full p-2`}
          >
            <div className="relative h-8 w-8 lg:h-14 lg:w-14 justify-center">
              <Image src="/subscribe.png" alt="top-up" fill />
            </div>{" "}
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
