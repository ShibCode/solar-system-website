import React, { cloneElement, forwardRef, useEffect, useRef } from "react";
import usePrevious from "../hooks/usePrevious";
import gsap from "gsap";
import FlipGSAP from "gsap/Flip";

const Flip = forwardRef(
  (
    { children, activeState, duration = 0.4, className = "", fade = "cross" },
    ref
  ) => {
    const activeRef = useRef();
    const hiddenRef = useRef();
    const wrapper = useRef();

    const previousState = usePrevious(activeState) ?? 0;

    const flipState = useRef();
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        flipState.current = FlipGSAP.getState(wrapper.current);
        isFirstRender.current = false;
      } else {
        FlipGSAP.from(flipState.current, {
          duration,
          ease: "power1.out",
          onComplete: () =>
            (flipState.current = FlipGSAP.getState(wrapper.current)),
        });

        gsap.fromTo(
          activeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: duration * 0.5, ease: "power1.out" }
        );

        if (fade === "cross") {
          gsap.fromTo(
            hiddenRef.current,
            { opacity: 1 },
            { opacity: 0, duration, ease: "power1.out" }
          );
        } else if (fade === "over") {
          gsap.fromTo(
            hiddenRef.current,
            { opacity: 1 },
            {
              opacity: 0,
              delay: duration,
              duration: 0.0001,
            }
          );
        }
      }
    }, [activeState]);

    const currentChild =
      typeof children === "function" ? children(activeState) : children;
    const previousChild =
      typeof children === "function" ? children(previousState) : children;

    return (
      <div ref={ref} className={`relative w-full ${className}`}>
        {cloneElement(currentChild, {
          style: { opacity: 0, pointerEvents: "none" },
        })}

        <div ref={wrapper} className="absolute inset-0">
          {cloneElement(currentChild, {
            ref: activeRef,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            },
            className: `${currentChild.props.className} flip-visible-element`,
          })}

          {cloneElement(previousChild, {
            ref: hiddenRef,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0,
            },
          })}
        </div>
      </div>
    );
  }
);

export default Flip;
