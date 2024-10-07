import React, { forwardRef, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ChevronIcon from "../../components/svg/ChevronIcon";

const VISIBLE_SLIDES = 3;

const DepthCarousel = ({ className = "", data }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const zeroImage = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const thirdImage = useRef(null);
  const lastImage = useRef(null);

  const next = () => {
    if (isAnimating) return;

    const newActiveImage = (activeImage + 1) % data.length;

    setIsAnimating(true);

    gsap.to(firstImage.current, {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to([secondImage.current, thirdImage.current], {
      transform: (i) =>
        `perspective(100px) translateZ(${i * -0.5}em) translateY(${i * 50}px)`,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(lastImage.current, {
      opacity: 1,
      transform: `perspective(100px) 
          translateZ(${(VISIBLE_SLIDES - 1) * -0.5}em) 
          translateY(${(VISIBLE_SLIDES - 1) * 50}px)`,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setIsAnimating(false);
        setActiveImage(newActiveImage);
      },
    });
  };

  const prev = () => {
    if (isAnimating) return;

    const newActiveImage = (activeImage - 1 + data.length) % data.length;

    setIsAnimating(true);

    gsap.to(zeroImage.current, {
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(thirdImage.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to([firstImage.current, secondImage.current, thirdImage.current], {
      transform: (i) =>
        `perspective(100px)
           translateZ(${(i + 1) * -0.5}em) 
           translateY(${(i + 1) * 50}px)`,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        setIsAnimating(false);
        setActiveImage(newActiveImage);
      },
    });
  };

  useEffect(() => {
    gsap.set(zeroImage.current, { zIndex: 1, opacity: 0, yPercent: 100 });

    gsap.set(lastImage.current, {
      zIndex: -data.length,
      transform: `perspective(100px) 
          translateZ(${VISIBLE_SLIDES * -0.5}em) 
          translateY(${VISIBLE_SLIDES * 50}px)`,
      opacity: 0,
    });

    gsap.set([firstImage.current, secondImage.current, thirdImage.current], {
      opacity: 1,
      zIndex: (i) => -i,
      transform: (i) =>
        `perspective(100px) translateZ(${i * -0.5}em) translateY(${i * 50}px)`,
    });
  }, [activeImage]);

  return (
    <div
      className={`flex flex-col items-center gap-10 relative aspect-[1600/900] max-w-[650px] w-full text-[20px] ${className}`}
    >
      <div className="absolute top-full translate-y-20 flex gap-2.5 xs:gap-8 z-10">
        <button
          onClick={prev}
          className="size-10 bg-black text-white rounded-md flex justify-center items-center"
        >
          <ChevronIcon className="rotate-180 w-7 xs:w-auto" />
        </button>

        <button
          onClick={next}
          className="size-10 bg-black text-white rounded-md flex justify-center items-center"
        >
          <ChevronIcon className="w-7 xs:w-auto" />
        </button>
      </div>

      <Card
        ref={zeroImage}
        card={data[(activeImage + data.length - 1) % data.length]}
      />

      <Card ref={firstImage} card={data[(activeImage + 0) % data.length]} />
      <Card ref={secondImage} card={data[(activeImage + 1) % data.length]} />
      <Card ref={thirdImage} card={data[(activeImage + 2) % data.length]} />
      <Card ref={lastImage} card={data[(activeImage + 3) % data.length]} />
    </div>
  );
};

export default DepthCarousel;

const Card = forwardRef(({ card }, ref) => {
  return (
    <img
      ref={ref}
      src={card}
      alt="temp"
      className="w-full h-full object-cover absolute top-0 left-0 rounded-xl"
    />
  );
});
