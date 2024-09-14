import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-6 relative font-code">
      <div className="flex flex-col items-center gap-[1px]">
        <img src="/logo.svg" alt="" className="w-11" />
        <span className="uppercase font-bold text-sm">Mastermind</span>
      </div>

      <span className="absolute left-1/2 -translate-x-1/2 uppercase font-semibold text-2xl">
        Home
      </span>

      <div className="flex gap-7">
        <button className="font-semibold rounded-full tracking-tighter leading-none h-9">
          <span className="translate-y-[-1px] inline-block">Play</span>
        </button>

        <button className="bg-orange-600 px-5 font-semibold rounded-full tracking-tighter leading-none h-9">
          <span className="translate-y-[-1px] inline-block">Lets Talk!</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
