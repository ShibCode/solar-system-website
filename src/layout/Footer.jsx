import React from "react";

const Footer = () => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-5 flex flex-col items-center gap-2">
      <h2 className="text-lg font-code font-semibold">Powered By</h2>

      <div className="flex gap-14 items-center">
        <img src="/unity.png" alt="unity" className="h-10" />
        <img src="/gamemaker.png" alt="gamemaker" className="h-10" />
        <img src="/unreal-engine.png" alt="unreal engine" className="h-14" />
      </div>
    </div>
  );
};

export default Footer;
