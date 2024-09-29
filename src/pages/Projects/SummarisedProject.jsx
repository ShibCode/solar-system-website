import gsap from "gsap";
import React, { useRef } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import projects from "../../data/projects.json";

const SummarisedProject = ({
  isLearningMore,
  handleLearnMore,
  activeProject,
}) => {
  const description = useRef();
  const image = useRef();

  useUpdateEffect(() => {
    if (isLearningMore) {
      gsap.to(description.current, { x: -1000 });
      gsap.to(image.current, { scale: 0 });
    } else {
      gsap.to(description.current, { x: 0, delay: 0.25, duration: 0.75 });
      gsap.to(image.current, { scale: 1, delay: 0.25, duration: 0.75 });
    }
  }, [isLearningMore]);

  return (
    <div
      className={`flex gap-10 items-center w-full h-full pl-[200px] absolute top-0 ${
        isLearningMore ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <div className={`flex flex-col gap-4 items-start`}>
        <div className="project-name-wrapper text-3xl h-[1em]">
          <h6 className="font-semibold project-name">
            {projects[activeProject].name}
          </h6>
        </div>

        <p ref={description}>{projects[activeProject].intro}</p>

        <div className="project-learn-more-wrapper h-[24px]">
          <button
            onClick={handleLearnMore}
            className="text-orange-600 !leading-[1.1] project-learn-more whitespace-nowrap relative"
          >
            <span className={`border-b border-orange-600`}>Learn More</span>
            <span
              style={{ opacity: 0 }}
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border-b border-orange-600`}
            >
              Go Back
            </span>
          </button>
        </div>
      </div>

      <div
        className={`aspect-[1600/900] flex items-center justify-center w-full`}
      >
        <img
          ref={image}
          src={projects[activeProject].images[0]}
          alt="flymasters"
          className="w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
};

export default SummarisedProject;
