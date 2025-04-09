import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-[#6d2867] opacity-75 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-[#6d2867]"></div>
      </div>
    </div>
  );
};

export default Loader;
