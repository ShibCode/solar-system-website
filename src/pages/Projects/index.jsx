import React, { useRef, useState } from "react";
import { useAttributes } from "../../context/AttributesProvider";
import { pages } from "../../constants";
import { Flip } from "gsap/all";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import ProjectsList from "./ProjectsList";
import SummarisedProject from "./SummarisedProject";
import DetailedProject from "./DetailedProject";
import gsap from "gsap";
import { useSelector } from "react-redux";

const Projects = ({ useOnActive }) => {
  const [isLearningMore, setIsLearningMore] = useState(false);
  const [activeProject, setActiveProject] = useState(2);

  const { attributes, setAttributes, cameraAttributes } = useAttributes();

  const { focusedPlanet } = useSelector((state) => state.orbit);

  const main = useRef();

  useOnActive((baseDelay) => {
    gsap.fromTo(
      main.current,
      { opacity: 0, y: 120 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: baseDelay }
    );
  });

  const originalAttributes = useRef(null);
  const isAnimating = useRef(false);

  const handleLearnMore = () => {
    if (!originalAttributes.current) {
      originalAttributes.current = { ...attributes };
    }

    if (isAnimating.current) return;

    isAnimating.current = true;

    if (isLearningMore) {
      setAttributes({
        targetX: originalAttributes.current.x,
        targetY: originalAttributes.current.y,
        duration: 1,
        onComplete: () => (isAnimating.current = false),
      });
    } else {
      const { offset, size, side } = pages.find(
        (p) => p.label === "Projects"
      ).planet;

      setAttributes({
        targetX: attributes.x + cameraAttributes[side] - offset * size,
        targetY: focusedPlanet.position.y * attributes.zoom * 2,
        duration: 1,
        onComplete: () => (isAnimating.current = false),
      });
    }

    setIsLearningMore((prev) => !prev);
  };

  useUpdateEffect(() => {
    const [nameWrapper1, nameWrapper2] = document.querySelectorAll(
      ".project-name-wrapper"
    );
    const [learnWrapper1, learnWrapper2] = document.querySelectorAll(
      ".project-learn-more-wrapper"
    );

    const name = document.querySelector(".project-name"); // name of the project
    const learn = document.querySelector(".project-learn-more"); // learn more btn
    const learnMoreTexts = learn.querySelectorAll(".flip-visible-element span"); // "Go back" and "Learn more"

    const nameState = Flip.getState(name);
    const learnState = Flip.getState(learn);

    if (isLearningMore) {
      nameWrapper2.appendChild(name);
      learnWrapper2.appendChild(learn);

      gsap.to(learnMoreTexts[0], { opacity: 0, delay: 0.25, duration: 0.75 });
      gsap.to(learnMoreTexts[1], { opacity: 1, delay: 0.25, duration: 0.75 });
    } else {
      nameWrapper1.appendChild(name);
      learnWrapper1.appendChild(learn);

      gsap.to(learnMoreTexts[0], { opacity: 1, delay: 0.25, duration: 0.75 });
      gsap.to(learnMoreTexts[1], { opacity: 0, delay: 0.25, duration: 0.75 });
    }

    Flip.from(nameState, { delay: 0.25, duration: 0.75 });
    Flip.from(learnState, { delay: 0.25, duration: 0.75 });
  }, [isLearningMore]);

  return (
    <div
      ref={main}
      style={{ opacity: 0 }}
      className={`flex flex-col items-center w-[75%] gap-20 relative h-full`}
    >
      <ProjectsList
        isLearningMore={isLearningMore}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />

      <SummarisedProject
        isLearningMore={isLearningMore}
        handleLearnMore={handleLearnMore}
        activeProject={activeProject}
      />

      <DetailedProject
        isLearningMore={isLearningMore}
        handleLearnMore={handleLearnMore}
        activeProject={activeProject}
      />
    </div>
  );
};

export default Projects;
