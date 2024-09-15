import { Html, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  ORBIT_SCALE_UP_COMPLETE_DURATION,
  PLANET_FADE_IN_DURATION,
} from "./constants";
import * as THREE from "three";

const Planet = forwardRef(({ planet, orbit, points, mesh, index }, ref) => {
  const [posX, posY] = Object.values(points.getPoint(planet.positionIndex));

  const [label, setLabel] = useState(null);

  const labelRef = useRef();

  useEffect(() => {
    if (!mesh) return;

    if (index > 0)
      gsap.fromTo(
        mesh.material,
        { opacity: 0 },
        {
          opacity: 1,
          duration: PLANET_FADE_IN_DURATION,
          delay: ORBIT_SCALE_UP_COMPLETE_DURATION,
        }
      );
    else gsap.fromTo(mesh.material, { opacity: 0 }, { opacity: 1 });
  }, [mesh]);

  useEffect(() => {
    if (label)
      gsap.fromTo(
        label,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: ORBIT_SCALE_UP_COMPLETE_DURATION + PLANET_FADE_IN_DURATION / 4,
        }
      );
  }, [label]);

  const firstPlanetPositionIndex = useRef(0);

  useEffect(() => {
    gsap.to(firstPlanetPositionIndex, {
      current: 1 + planet.positionIndex,
      duration: ORBIT_SCALE_UP_COMPLETE_DURATION + PLANET_FADE_IN_DURATION / 4,
      ease: "back.out(0.6)",
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

  const light = useRef();

  // useHelper(light, THREE.PointLightHelper, 1, "white");

  return (
    <mesh
      ref={ref}
      scale={planet.size}
      position={[posX * orbit.scale, posY * orbit.scale, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={planet.color} transparent />

      <Html
        ref={labelRef}
        center
        position-y={-1 - 0.2 / planet.size}
        style={{ opacity: 0 }}
      >
        <h2 className="text-white text-xl font-bold whitespace-nowrap planet-label font-code tracking-tight">
          {planet.label}
        </h2>
      </Html>
    </mesh>
  );
});

export default Planet;
