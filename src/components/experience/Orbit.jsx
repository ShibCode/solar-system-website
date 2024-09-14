import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { orbits } from "./constants";

const DURATION = 0.4;
const STAGGER_FACTOR = 0.6;

const Orbit = ({ path, scale, index }) => {
  const orbitRef = useRef();
  const attributes = useRef({
    scale: orbits[index - 1]?.scale || 1,
  });

  useEffect(() => {
    if (index === 0) return;

    gsap.to(attributes.current, {
      scale,
      duration: DURATION,
      delay: DURATION * STAGGER_FACTOR * index + 1,
      ease: "power2.out",
    });

    gsap.set(orbitRef.current.material, {
      opacity: 1,
      delay: DURATION * STAGGER_FACTOR * index + 1,
      ease: "power2.out",
    });
  }, []);

  useFrame(() => {
    orbitRef.current.scale.setScalar(attributes.current.scale);
  }, []);

  return (
    <line ref={orbitRef}>
      <bufferGeometry attach="geometry" {...path} />
      <lineBasicMaterial
        color={"#484848"}
        attach="material"
        transparent
        opacity={index === 0 ? 1 : 0}
      />
    </line>
  );
};

export default Orbit;
