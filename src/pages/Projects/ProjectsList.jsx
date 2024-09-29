import React, { useRef } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import gsap from "gsap";
import projects from "../../data/projects.json";

const ProjectsList = ({ isLearningMore, activeProject, setActiveProject }) => {
  const projectsList = useRef();

  useUpdateEffect(() => {
    if (isLearningMore) gsap.to(projectsList.current, { x: -1000 });
    else gsap.to(projectsList.current, { x: 0, delay: 0.25, duration: 0.75 });
  }, [isLearningMore]);

  return (
    <ul
      ref={projectsList}
      style={{
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0))",
      }}
      className={`flex flex-col pointer-events-auto whitespace-nowrap absolute top-1/2 -translate-y-1/2 left-0 z-10 h-[240px] overflow-hidden ${
        isLearningMore ? "" : ""
      }`}
    >
      {projects.map(({ name }, i) => (
        <li
          key={name}
          style={{
            translate: `0px ${(activeProject - 2) * -100}%`,
          }}
          onClick={() => setActiveProject(i)}
          className="cursor-pointer text-lg py-2.5 transition-all duration-300"
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
