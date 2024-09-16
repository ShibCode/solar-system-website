import React, { useRef, useState } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import gsap from "gsap";

const Accordian = ({ service }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef(null);
  const descriptionRef = useRef(null);

  useUpdateEffect(() => {
    const tl = gsap.timeline();

    if (isOpen) {
      tl.to(contentRef.current, {
        gridTemplateRows: "1fr",
        ease: "power4.out",
        duration: 1,
      });
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out" },
        "-=0.6"
      );
    } else {
      tl.to(contentRef.current, { gridTemplateRows: "0fr" });
    }
  }, [isOpen]);

  return (
    <div className="pl-6 pr-14 relative inset-0">
      <div
        style={{ backgroundColor: service.color || "red" }}
        className="absolute inset-0 service-accordian-background rounded-[9px] -z-10"
      />

      <div className="flex justify-between items-center py-4">
        <span className="text-xl font-semibold service-accordian-title">
          {service.title}
        </span>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{ color: service.color || "red" }}
          className="bg-white rounded-full size-8 text-4xl absolute right-6 bottom-3.5 service-accordian-btn"
        >
          <span className="inline-block -translate-y-1 !leading-none">+</span>
        </button>
      </div>

      <div
        style={{ gridTemplateRows: "0fr" }}
        ref={contentRef}
        className="grid"
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-8">
            <p ref={descriptionRef} className="text-lg leading-[1.5]">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
