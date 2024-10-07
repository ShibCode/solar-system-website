import gsap from "gsap";
import React, { useRef } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import projects from "../../data/projects.json";
import Flip from "../../components/Flip";

const SummarisedProject = ({
  isLearningMore,
  handleLearnMore,
  activeProject,
}) => {
  const description = useRef();
  const image = useRef();

  useUpdateEffect(() => {
    if (isLearningMore) {
      gsap.to(description.current, { x: -2000, duration: 1 });
      gsap.to(image.current, { scale: 0 });
    } else {
      gsap.to(description.current, { x: 0, delay: 0.25, duration: 0.75 });
      gsap.to(image.current, { scale: 1, delay: 0.25, duration: 0.75 });
    }
  }, [isLearningMore]);

  return (
    <div
      className={`flex gap-10 items-center w-full h-full pl-[200px] ${
        isLearningMore ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <div className={`flex flex-col gap-4 items-start w-full`}>
        <div className="project-name-wrapper text-3xl w-full h-[1em]">
          <Flip activeState={activeProject} className="project-name">
            {(state) => (
              <h6 className="font-semibold !leading-none">
                {projects[state].name}
              </h6>
            )}
          </Flip>
        </div>

        <Flip activeState={activeProject} ref={description}>
          {(state) => <p>{projects[state].intro}</p>}
        </Flip>

        <div className="project-learn-more-wrapper h-[24px]">
          <Flip activeState={activeProject} className="project-learn-more">
            <button
              onClick={handleLearnMore}
              className="text-orange-600 !leading-[1.1] whitespace-nowrap relative"
            >
              <span className={`border-b border-orange-600`}>Learn More</span>
              <span
                style={{ opacity: 0 }}
                className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border-b border-orange-600`}
              >
                Go Back
              </span>
            </button>
          </Flip>
        </div>
      </div>

      <Flip
        ref={image}
        activeState={activeProject}
        fade="over"
        className={`aspect-[1600/900] flex items-center justify-center w-full`}
      >
        {(state) => (
          <img
            src={projects[state].images[0]}
            alt="flymasters"
            className="w-full h-full rounded-xl"
          />
        )}
      </Flip>
    </div>
  );
};

export default SummarisedProject;
