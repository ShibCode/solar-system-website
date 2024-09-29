import React, { useEffect, useRef } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import gsap from "gsap";
import projects from "../../data/projects.json";
import { useAttributes } from "../../context/AttributesProvider";
import { useSelector } from "react-redux";

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
        targetY:
          (focusedPlanet.position.y * attributes.zoom + 0.6) * (2 - progress),
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
      className={`flex flex-col gap-10 items-center w-full absolute top-0 pb-[120px] overflow-hidden ${
        isLearningMore ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className={`flex flex-col gap-4 items-center`}>
        <div className="project-name-wrapper text-3xl h-[1em]"></div>

        <div className="project-learn-more-wrapper h-[24px]"></div>

        <div className={`flex flex-col items-center gap-10 mt-4`}>
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <h6
              style={{ opacity: 0 }}
              className="text-xl font-semibold max-w-[400px] detailed-project-item"
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
                <div className="!leading-none px-4 py-2 bg-black text-text-white rounded-md font-semibold text-lg flex items-center gap-2.5 cursor-pointer hover:![scale:1.05] transition-[scale,background-color] duration-300 hover:bg-[#0a0a0a]">
                  <img src={tech.path} className="size-[21px]" />
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`aspect-[1600/900] flex items-center justify-center w-1/2`}
      >
        <img
          style={{ opacity: 0 }}
          src="/project.png"
          alt="flymasters"
          className="w-full h-full rounded-xl detailed-project-item"
        />
      </div>
    </div>
  );
};

export default DetailedProject;
