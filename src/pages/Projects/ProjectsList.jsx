import React, { useEffect, useRef } from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import gsap from "gsap";
import projects from "../../data/projects.json";

const ProjectsList = ({ isLearningMore, activeProject, setActiveProject }) => {
  const projectsList = useRef();

  useUpdateEffect(() => {
    if (isLearningMore)
      gsap.to(projectsList.current, {
        x: -1000,
        onComplete: () => {
          const listItems = projectsList.current.querySelectorAll("li");
          gsap.set(listItems, { yPercent: 0 });
        },
      });
    else gsap.to(projectsList.current, { x: 0, delay: 0.25, duration: 0.75 });
  }, [isLearningMore]);

  useEffect(() => {
    const handleWheel = (e) => {
      const listItems = projectsList.current.querySelectorAll("li");

      listItems.forEach((item) => {
        const y = gsap.getProperty(item, "yPercent");

        if (e.deltaY < 0) {
          gsap.to(item, {
            yPercent: Math.min(y - e.deltaY, activeProject * 100),
            duration: 0.1,
            ease: "power2.out",
          });
        } else {
          gsap.to(item, {
            yPercent: Math.max(
              y - e.deltaY,
              (projects.length - 1) * -100 + activeProject * 100
            ),
            duration: 0.1,
            ease: "power2.out",
          });
        }
      });
    };

    projectsList.current?.addEventListener("wheel", handleWheel);
    return () =>
      projectsList.current?.removeEventListener("wheel", handleWheel);
  }, [activeProject]);

  return (
    <ul
      ref={projectsList}
      style={{
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0))",
      }}
      className={`flex flex-col pointer-events-auto whitespace-nowrap absolute top-1/2 -translate-y-1/2 left-0 z-10 h-[240px] overflow-hidden ${
        isLearningMore ? "" : ""
      }`}
    >
      {projects.map(({ name }, i) => (
        <li
          key={i}
          style={{
            translate: `0px ${(activeProject - 2) * -100}%`,
          }}
          onClick={() => {
            setActiveProject(i);
            const listItems = projectsList.current.querySelectorAll("li");

            listItems.forEach((item) => {
              item.style.transitionProperty = "all";
              gsap.set(item, { yPercent: 0 });
              setTimeout(() => {
                item.style.transitionProperty = "translate";
              }, 300);
            });
          }}
          className={`cursor-pointer text-lg py-2.5 transition-[translate] duration-300 text-center px-2 rounded-lg ${
            activeProject === i
              ? "bg-white text-black"
              : "hover:bg-white/80 hover:text-black/80"
          }`}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
