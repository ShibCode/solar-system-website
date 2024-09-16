import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ORBIT_SCALE_UP_COMPLETE_DURATION,
  PLANET_FADE_IN_DURATION,
  ZOOM_IN_DELAY,
  ZOOM_IN_DURATION,
} from "../components/experience/constants";
import { useSelector } from "react-redux";
import useUpdateEffect from "../hooks/useUpdateEffect";

const Navigation = ({ label, navigationLinks }) => {
  const wrapper = useRef();
  const line = useRef();

  const { focusedPlanet } = useSelector((state) => state.orbit);

  useUpdateEffect(() => {
    if (focusedPlanet?.object.userData.label === label)
      gsap.to(wrapper.current, { x: 0, duration: 0.3, delay: 0.7 });
    else gsap.to(wrapper.current, { x: 120, duration: 0.3 });
  }, [focusedPlanet]);

  useEffect(() => {
    let BASE_DELAY =
      ORBIT_SCALE_UP_COMPLETE_DURATION + PLANET_FADE_IN_DURATION * 0.5;

    if (label !== undefined)
      BASE_DELAY = ZOOM_IN_DELAY + ZOOM_IN_DURATION - 0.5;

    const linkNumbers = [
      ...wrapper.current.querySelectorAll(".navigation-number"),
    ];
    const linkLabels = [
      ...wrapper.current.querySelectorAll(".navigation-label"),
    ];

    gsap.set([...linkLabels.slice(1), ...linkNumbers.slice(1, -1)], {
      opacity: 0,
      pointerEvents: "none",
    });

    gsap.fromTo(
      [linkNumbers[0], linkNumbers[linkNumbers.length - 1]],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: BASE_DELAY,
        stagger: 1,
      }
    );

    gsap.fromTo(
      linkLabels[0],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: BASE_DELAY,
        y: 0,
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
  }, []);

  const expandNav = () => {
    const linkNumbers = [
      ...wrapper.current.querySelectorAll(".navigation-number"),
    ];
    const linkLabels = [
      ...wrapper.current.querySelectorAll(".navigation-label"),
    ];

    gsap.to(line.current, {
      scaleY: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(linkNumbers.slice(-1), {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.fromTo(
      linkLabels.slice(1),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.25,
        pointerEvents: "auto",
      }
    );

    gsap.fromTo(
      linkNumbers.slice(1, -1),
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.3,
        pointerEvents: "auto",
      }
    );
  };

  const collapseNav = () => {
    const linkNumbers = [
      ...wrapper.current.querySelectorAll(".navigation-number"),
    ];
    const linkLabels = [
      ...wrapper.current.querySelectorAll(".navigation-label"),
    ];

    gsap.to(line.current, {
      scaleY: 1,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });

    gsap.to(linkNumbers.slice(-1), {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
      delay: 0,
    });

    gsap.to([...linkLabels.slice(1), ...linkNumbers.slice(1, -1)], {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      pointerEvents: "none",
    });
  };

  return (
    <div
      ref={wrapper}
      onMouseEnter={expandNav}
      onMouseLeave={collapseNav}
      className="fixed bottom-5 right-5 font-semibold flex items-end !leading-none text-lg h-[11em] whitespace-nowrap gap-4"
    >
      {navigationLinks ? (
        <>
          <div className="h-full flex flex-col items-end">
            {navigationLinks.map((link, i) => (
              <div
                key={i}
                className="relative h-[calc(100%/5)] flex items-center cursor-pointer"
              >
                <span
                  className={`navigation-label ${
                    focusedPlanet?.object.userData.label === link.label
                      ? "text-[#fff]"
                      : "text-[#767676]"
                  }`}
                >
                  {link.label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-full">
            <div
              ref={line}
              style={{
                translate: "-50% -50%",
              }}
              className="border border-white h-[calc(61%)] bg-white absolute top-1/2 left-1/2 origin-top"
            />

            {navigationLinks.map((link, i) => (
              <div
                key={i}
                className={`relative h-[calc(100%/5)] flex items-center cursor-pointer ${
                  focusedPlanet?.object.userData.label === link.label
                    ? "text-[#fff]"
                    : "text-[#767676]"
                }`}
              >
                <span className="inline-block navigation-number">
                  {i.toString().padStart(2, "0")}
                </span>
              </div>
            ))}

            <div className="absolute h-[calc(100%/5)] flex items-center bottom-0">
              <span className="inline-block navigation-number">
                {(navigationLinks.length - 1).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-full flex flex-col justify-between">
            <div className="relative h-[calc(100%/5)] flex items-center">
              <span className="navigation-label">Home</span>
            </div>
          </div>
          <div className="relative h-full flex flex-col justify-between">
            <div
              ref={line}
              style={{
                translate: "-50% -50%",
              }}
              className="border border-white h-[calc(61%)] bg-white absolute top-1/2 left-1/2 origin-top"
            />

            <div className="relative h-[calc(100%/5)] flex items-center">
              <span className="inline-block navigation-number">00</span>
            </div>

            <div className="relative h-[calc(100%/5)] flex items-center">
              <span className="inline-block navigation-number">01</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;
