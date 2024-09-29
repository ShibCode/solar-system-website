import React from "react";

const Header = () => {
  return (
    <div className="absolute w-full top-0 left-0 flex justify-between items-center p-6 z-10">
      <div className="item-slide flex flex-col items-center gap-[1px]">
        <img src="/logo.svg" alt="" className="w-11" />
        <span className="uppercase font-bold text-sm">Mastermind</span>
      </div>

      <span className="item-slide absolute left-1/2 -translate-x-1/2 uppercase font-semibold text-2xl">
        Home
      </span>

      <div className="item-slide flex gap-7">
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
