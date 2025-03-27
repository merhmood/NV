import React from "react";

import AllArticles from "@/components/AllArticles";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex flex-col justify-between h-screen">
      <div>
        <Navigation />
        <div className="mt-28 lg:mt-32 w-5/6 max-w-5xl mx-auto">
          <Link
            href="https://www.instagram.com/nutty__vibes"
            className="lg:hidden text-blue-700 text-sm my-4 text-center"
            target="_blank"
          >
            Follow us on Instagram.
          </Link>
          <div className="relative mt-1 mb-5">
            <iframe
              src="//a.magsrv.com/iframe.php?idzone=5571162&size=auto"
              width="100%"
              height="100%"
            ></iframe>
            <p className="absolute top-0 left-2 font-bold">Ads</p>
          </div>
        </div>
        <AllArticles />
      </div>
      <Footer />
    </main>
  );
}
