import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import {
  INITIAL_DELAY,
  ORBIT_SCALE_UP_DURATION,
  ORBIT_SCALE_UP_STAGGER,
  orbits,
} from "./constants";

const Orbit = ({ path, scale, index }) => {
  const orbitRef = useRef();
  const attributes = useRef({
    scale: orbits[index - 1]?.scale || 1,
  });

  useEffect(() => {
    if (index === 0) {
      gsap.to(orbitRef.current.material, {
        opacity: 0.5,
        delay: INITIAL_DELAY - 0.5,
      });

      return;
    }

    gsap.to(attributes.current, {
      scale,
      duration: ORBIT_SCALE_UP_DURATION,
      delay: ORBIT_SCALE_UP_STAGGER * index + 0.5 + INITIAL_DELAY,
      ease: "power2.out",
    });

    gsap.set(orbitRef.current.material, {
      opacity: 0.5,
      delay: ORBIT_SCALE_UP_STAGGER * index + 0.5 + INITIAL_DELAY,
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
        color={"#4d4d5c"}
        attach="material"
        transparent
        opacity={0}
      />
    </line>
  );
};

export default Orbit;
