import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  INITIAL_DELAY,
  ORBIT_SCALE_UP_COMPLETE_DURATION,
  PLANET_FADE_IN_DURATION,
} from "./constants";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { useSelector } from "react-redux";

const Planet = forwardRef(({ planet, orbit, points, mesh, index }, ref) => {
  const [posX, posY] = Object.values(points.getPoint(planet.positionIndex));

  const [label, setLabel] = useState(null);

  const { focusedPlanet } = useSelector((state) => state.orbit);

  const labelRef = useRef();

  useEffect(() => {
    if (!mesh) return;

    if (index > 0) {
      gsap.fromTo(
        mesh.material,
        { opacity: 0 },
        {
          opacity: 1,
          duration: PLANET_FADE_IN_DURATION,
          delay: ORBIT_SCALE_UP_COMPLETE_DURATION,
        }
      );
    } else
      gsap.fromTo(
        mesh.material,
        { opacity: 0 },
        { opacity: 1, delay: INITIAL_DELAY }
      );
  }, [mesh]);

  useEffect(() => {
    if (label)
      gsap.fromTo(
        label,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: ORBIT_SCALE_UP_COMPLETE_DURATION + 0.3,
        }
      );
  }, [label]);

  useUpdateEffect(() => {
    if (focusedPlanet) gsap.to(label, { opacity: 0, duration: 0.3 });
    else gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.7 });
  }, [focusedPlanet]);

  const firstPlanetPositionIndex = useRef(0);

  useEffect(() => {
    gsap.to(firstPlanetPositionIndex, {
      current: 1 + planet.positionIndex,
      duration:
        ORBIT_SCALE_UP_COMPLETE_DURATION +
        PLANET_FADE_IN_DURATION * 0.25 -
        INITIAL_DELAY,
      delay: INITIAL_DELAY,
      ease: "power2.out",
    });
  }, []);

  useFrame(() => {
    if (labelRef.current) {
      setLabel(labelRef.current);
      labelRef.current = null;
    }

    if (index === 0) {
      const [posX, posY] = Object.values(
        points.getPoint(firstPlanetPositionIndex.current % 1)
      );
      mesh.position.set(posX * orbit.scale, posY * orbit.scale, 0);
    }
  });

  return (
    <mesh
      ref={ref}
      scale={planet.size}
      position={[posX * orbit.scale, posY * orbit.scale, 0]}
      userData={planet}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={planet.color} transparent />

      <Html
        ref={labelRef}
        center
        position-y={-1 - 0.2 / planet.size}
        style={{ opacity: 0 }}
      >
        <h2 className="text-white text-xl font-bold whitespace-nowrap planet-label tracking-tight">
          {planet.label}
        </h2>
      </Html>
    </mesh>
  );
});

export default Planet;
