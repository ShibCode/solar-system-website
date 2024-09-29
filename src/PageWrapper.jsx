import { cloneElement, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUpdateEffect from "./hooks/useUpdateEffect";
import { pages, ZOOM_IN_DELAY, ZOOM_IN_DURATION } from "./constants";
import Navigation from "./layout/Navigation";
import { updateFocusedPlanet } from "./features/orbitSlice/orbitSlice";
import gsap from "gsap";

const PageWrapper = ({ children, page }) => {
  const [isShowingPage, setIsShowingPage] = useState(false);

  const { focusedPlanet } = useSelector((state) => state.orbit);

  const baseDelay = ZOOM_IN_DELAY + ZOOM_IN_DURATION - 0.5;
  const isActive = focusedPlanet?.userData.label === page.label;

  useUpdateEffect(() => {
    if (isActive) setIsShowingPage(true);
    else {
      setTimeout(() => setIsShowingPage(false), 1000);
    }
  }, [focusedPlanet]);

  return (
    isShowingPage && (
      <PageLayout isActive={isActive} baseDelay={baseDelay} page={page}>
        {children}
      </PageLayout>
    )
  );
};

export default PageWrapper;

const PageLayout = ({ children, isActive, baseDelay, page }) => {
  const dispatch = useDispatch();

  const navigationLinks = useMemo(() => {
    const links = pages.map((page) => ({
      label: page.label,
      onClick: () => dispatch(updateFocusedPlanet(page.label)),
    }));

    const index = links.findIndex((link) => link.label === page.label);

    return [links[index], ...links.slice(index + 1), ...links.slice(0, index)];
  }, []);

  const wrapper = useRef();
  const main = useRef();
  const headingWrapper = useRef();

  const useOnActive = (callback = () => {}) => {
    useEffect(() => {
      if (isActive) {
        gsap.fromTo(
          headingWrapper.current,
          { opacity: 0, y: -120 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            delay: baseDelay,
          }
        );
        callback(baseDelay);
      }
      return () => {
        if (main.current) {
          gsap.to(main.current, {
            y:
              -main.current.getBoundingClientRect().height - window.innerHeight,
            duration: 0.75,
            ease: "power1.out",
          });
        }
      };
    }, [isActive]);
    return;
  };

  return (
    <div
      ref={wrapper}
      id={page.label}
      className="pt-[160px] pb-[120px] gap-16 hide-scroll h-full overflow-auto flex flex-col items-center pointer-events-none fixed w-full top-0"
    >
      <Navigation label={page.label} navigationLinks={navigationLinks} />
      <div
        ref={main}
        className="flex flex-col items-center gap-16 flex-1 w-full"
      >
        <div
          ref={headingWrapper}
          style={{ opacity: 0 }}
          className="relative px-8 pt-6"
        >
          <div className="size-4 border-r-2 border-b-2 border-white absolute top-0 left-0" />
          <div className="size-4 border-l-2 border-b-2 border-white absolute top-0 right-0" />

          <span className="leading-none absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap text-white pointer-events-auto">
            {page.subheading}
          </span>

          <h1 className="text-4xl font-semibold pointer-events-auto">
            {page.label}
          </h1>
        </div>

        {cloneElement(children, { useOnActive })}
      </div>
    </div>
  );
};
