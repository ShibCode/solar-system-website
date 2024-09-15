import gsap from "gsap";
import React, { useRef } from "react";
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useSelector } from "react-redux";

const Footer = () => {
  const { focusedPlanet } = useSelector((state) => state.orbit);

  const wrapper = useRef();

  useUpdateEffect(() => {
    if (focusedPlanet) gsap.to(wrapper.current, { y: 120, duration: 0.3 });
    else gsap.to(wrapper.current, { y: 0, duration: 0.3, delay: 0.7 });
  }, [focusedPlanet]);

  return (
    <div
      ref={wrapper}
      className="fixed left-1/2 -translate-x-1/2 bottom-5 flex flex-col items-center gap-2"
    >
      <h2 className="item-slide slide-up text-lg font-code font-semibold">
        Powered By
      </h2>

      <div className="flex gap-14 items-center">
        <img
          src="/unity.png"
          alt="unity"
          className="item-slide slide-up h-10"
        />
        <img
          src="/gamemaker.png"
          alt="gamemaker"
          className="item-slide slide-up h-10"
        />
        <img
          src="/unreal-engine.png"
          alt="unreal engine"
          className="item-slide slide-up h-14"
        />
      </div>
    </div>
  );
};

export default Footer;
