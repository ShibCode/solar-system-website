import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ORBIT_SCALE_UP_COMPLETE_DURATION,
  PLANET_FADE_IN_DURATION,
  ZOOM_IN_DELAY,
  ZOOM_IN_DURATION,
} from "../constants";
import { useSelector } from "react-redux";
import useUpdateEffect from "../hooks/useUpdateEffect";

const Navigation = ({ label, navigationLinks }) => {
  const wrapper = useRef();
  const line = useRef();

  const isAnimatingIn = useRef(false);

  const { focusedPlanet } = useSelector((state) => state.orbit);

  useUpdateEffect(() => {
    if (focusedPlanet?.userData.label === label)
      gsap.to(wrapper.current, { x: 0, duration: 0.3, delay: 0.7 });
    else gsap.to(wrapper.current, { x: 150, duration: 0.3 });
  }, [focusedPlanet]);

  useEffect(() => {
    isAnimatingIn.current = true;

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
        onComplete: () => {
          isAnimatingIn.current = false;
        },
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

  const tweens = useRef(null);
  const isCheckingEachFrameForHover = useRef(false);

  const expandNav = () => {
    if (isAnimatingIn.current) {
      isCheckingEachFrameForHover.current = true;

      const checkIfIsStillAnimatingIn = () => {
        if (!isCheckingEachFrameForHover.current) return;

        if (isAnimatingIn.current)
          requestAnimationFrame(checkIfIsStillAnimatingIn);
        else {
          expandNav();
          isCheckingEachFrameForHover.current = false;
        }
      };

      requestAnimationFrame(checkIfIsStillAnimatingIn);

      return;
    }

    if (tweens.current) {
      tweens.current.forEach((t) => t.pause());
      tweens.current = null;
    }

    const linkNumbers = [
      ...wrapper.current.querySelectorAll(".navigation-number"),
    ];
    const linkLabels = [
      ...wrapper.current.querySelectorAll(".navigation-label"),
    ];

    const commons = {
      ease: "power2.out",
      onComplete: function () {
        tweens.current = tweens.current.filter((t) => t !== this);
      },
    };

    const t1 = gsap.to(line.current, {
      scaleY: 0,
      ...commons,
    });

    const t2 = gsap.to(linkNumbers.slice(-1), {
      opacity: 0,
      ...commons,
    });

    const t3 = gsap.fromTo(
      linkLabels.slice(1),
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        delay: 0.25,
        pointerEvents: "auto",
        ...commons,
      }
    );

    const t4 = gsap.fromTo(
      linkNumbers.slice(1, -1),
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        delay: 0.3,
        pointerEvents: "auto",
        ...commons,
      }
    );

    tweens.current = [t1, t2, t3, t4];
  };

  const collapseNav = () => {
    isCheckingEachFrameForHover.current = false;

    if (tweens.current) {
      tweens.current.forEach((t) => t.pause());
      tweens.current = null;
    }

    const linkNumbers = [
      ...wrapper.current.querySelectorAll(".navigation-number"),
    ];
    const linkLabels = [
      ...wrapper.current.querySelectorAll(".navigation-label"),
    ];

    const commons = {
      ease: "power2.out",
      onComplete: function () {
        tweens.current = tweens.current.filter((t) => t !== this);
      },
    };

    const t1 = gsap.to(line.current, {
      scaleY: 1,
      delay: 0.1,
      ...commons,
    });

    const t2 = gsap.to(linkNumbers.slice(-1), {
      opacity: 1,
      duration: 0.25,
      delay: 0,
      ...commons,
    });

    const t3 = gsap.to([...linkLabels.slice(1), ...linkNumbers.slice(1, -1)], {
      opacity: 0,
      duration: 0.35,
      pointerEvents: "none",
      ...commons,
    });

    tweens.current = [t1, t2, t3];
  };

  return (
    <div
      ref={wrapper}
      onMouseEnter={expandNav}
      onMouseLeave={collapseNav}
      className="fixed bottom-5 right-5 font-semibold flex !leading-none text-lg h-[11em] whitespace-nowrap gap-4 pointer-events-auto"
    >
      <div className="absolute right-[10.8px] h-[65%] translate-x-1/2 -translate-y-1/2 top-1/2">
        <div ref={line} className="w-0.5 h-full bg-white origin-top" />
      </div>

      {navigationLinks ? (
        <>
          <div className="h-full flex flex-col items-end">
            {navigationLinks.map((link, i) => (
              <div
                onClick={link.onClick}
                key={i}
                className={`relative h-[calc(100%/5)] flex items-center gap-3 z-10 cursor-pointer ${
                  i === 0 ? "text-[#fff]" : "text-[#767676]"
                }`}
              >
                <span style={{ opacity: 0 }} className="navigation-label">
                  {link.label}
                </span>

                <span
                  style={{ opacity: 0 }}
                  className="inline-block navigation-number"
                >
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
