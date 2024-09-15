import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ORBIT_SCALE_UP_COMPLETE_DURATION,
  PLANET_FADE_IN_DURATION,
} from "../components/experience/constants";
import { useSelector } from "react-redux";
import useUpdateEffect from "../hooks/useUpdateEffect";

const Navigation = () => {
  const wrapper = useRef();
  const line = useRef();
  const home = useRef();
  const zero = useRef();
  const one = useRef();

  const { focusedPlanet } = useSelector((state) => state.orbit);

  useUpdateEffect(() => {
    if (focusedPlanet) gsap.to(wrapper.current, { x: 120, duration: 0.3 });
    else gsap.to(wrapper.current, { x: 0, duration: 0.3, delay: 0.7 });
  }, [focusedPlanet]);

  useEffect(() => {
    let BASE_DELAY =
      ORBIT_SCALE_UP_COMPLETE_DURATION + PLANET_FADE_IN_DURATION * 0.5;
    // BASE_DELAY = 0;

    gsap.fromTo(
      zero.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: BASE_DELAY,
      }
    );

    gsap.fromTo(
      home.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: BASE_DELAY,
      }
    );

    gsap.fromTo(
      line.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1,
        ease: "power2.out",
        delay: BASE_DELAY + 0.25,
      }
    );

    gsap.fromTo(
      one.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: BASE_DELAY + 1,
      }
    );
  }, []);

  return (
    <div
      ref={wrapper}
      className="absolute bottom-5 right-5 font-code font-semibold text-end flex flex-col !leading-none text-lg h-[12em] whitespace-nowrap justify-between"
    >
      <div
        ref={line}
        style={{
          translate: "-50% -50%",
        }}
        className="border border-white h-[calc(100%*4/6)] bg-white absolute top-1/2 left-1/2 origin-top"
      />

      <div className="relative h-[calc(100%/6)] flex items-center">
        <span
          ref={home}
          className="inline-block absolute right-[calc(100%+14px)]"
        >
          Home
        </span>
        <span ref={zero} className="inline-block">
          00
        </span>
      </div>

      <div className="relative h-[calc(100%/6)] flex items-center">
        <span ref={one} className="inline-block">
          01
        </span>
      </div>
    </div>
  );
};

export default Navigation;
