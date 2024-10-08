import React, { useEffect, useRef } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import gsap from "gsap";
import projects from "../../data/projects.json";
import { useAttributes } from "../../context/AttributesProvider";
import { useSelector } from "react-redux";
import DepthCarousel from "./DepthCarousel";

const DetailedProject = ({ isLearningMore, activeProject }) => {
  const wrapper = useRef();

  useUpdateEffect(() => {
    const items = document.querySelectorAll(".detailed-project-item");

    if (isLearningMore) {
      gsap.set(wrapper.current, { maxHeight: 9999 });
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, delay: 0.75, stagger: 0.18, duration: 0.35 }
      );
    } else {
      gsap.to(items, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          gsap.set(wrapper.current, { maxHeight: 0 });
        },
      });
    }
  }, [isLearningMore]);

  const { setAttributes, attributes } = useAttributes();

  const { focusedPlanet } = useSelector((state) => state.orbit);

  useEffect(() => {
    const wrapper = document.querySelector("#Projects");
    const handleScroll = () => {
      const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
      const progress = Math.min(wrapper.scrollTop / maxScroll, 1);

      setAttributes({
        targetY: focusedPlanet.position.y * attributes.zoom * (2 - progress),
        duration: 0,
      });
    };

    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={wrapper}
      style={{ maxHeight: 0 }} // to avoid scroll when not opened
      className={`flex flex-col gap-14 items-center w-full absolute top-0 pb-[calc(50vh-183px)] overflow-hidden ${
        isLearningMore ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className={`flex flex-col gap-4 items-center`}>
        <div className="project-learn-more-wrapper h-[24px]"></div>

        <div className="project-name-wrapper text-3xl h-[1em]"></div>

        <div className={`flex flex-col items-center gap-10 mt-4`}>
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <h6
              style={{ opacity: 0 }}
              className="text-xl font-semibold max-w[400px] detailed-project-item"
            >
              {projects[activeProject].title}
            </h6>

            <p
              style={{ opacity: 0 }}
              className="max-w-[900px] detailed-project-item"
            >
              {projects[activeProject].description}
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <h6
              style={{ opacity: 0 }}
              className="text-xl font-semibold max-w-[400px] detailed-project-item"
            >
              Tech Stack
            </h6>

            <div className="flex gap-2 detailed-project-item">
              {projects[activeProject].techStack.map((tech, i) => (
                <div
                  key={i}
                  className="!leading-none px-4 py-2 bg-black text-text-white rounded-md font-semibold text-lg flex items-center gap-2.5 cursor-pointer transition-[background-color] duration-300 hover:bg-[#0f0f0f] relative group"
                >
                  {tech.tooltip && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full -translate-y-2 bg-black before:absolute before:w-0 before:h-0 before:border-l-8 before:border-r-8 before:border-t-8 before:border-transparent before:border-t-black before:top-full before:left-1/2 before:-translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 transition-all duration-300 w-[400px] text-sm px-3 py-2.5 leading-[1.25] text-start pointer-events-none group-hover:pointer-events-auto cursor-auto after:absolute after:w-full after:h-4 after:top-full after:left-0">
                      {tech.tooltip}
                    </div>
                  )}

                  <img src={tech.path} className="size-[21px]" />
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          <a
            href={projects[activeProject].link}
            target="_blank"
            className="text-orange-600 border-b border-current text-xl detailed-project-item"
          >
            Live Link
          </a>
        </div>
      </div>

      {projects[activeProject].images.length > 1 ? (
        <DepthCarousel
          data={projects[activeProject]}
          className="detailed-project-item"
        />
      ) : (
        <a
          style={{ opacity: 0 }}
          href={projects[activeProject].link}
          target="_blank"
          className={`aspect-[1600/900] flex items-center justify-center w-full max-w-[650px] border-2 border-white rounded-xl overflow-hidden detailed-project-item group`}
        >
          <img
            src={projects[activeProject].images[0]}
            alt="flymasters"
            className="w-full h-full group-hover:scale-105 transition-all duration-300 origin-top"
          />
        </a>
      )}
    </div>
  );
};

export default DetailedProject;
