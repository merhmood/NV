import Image from "next/image";
import { ollifiaPoettry } from "@/utils/font";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-600 text-white fixed bottom-0 w-full ">
      <div className="flex w-4/12 mx-auto justify-between items-center py-2">
        <div>Coin</div> <div>Gem</div>
      </div>
    </footer>
  );
};

export default Footer;
