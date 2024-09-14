import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef, useState } from "react";

const Planet = forwardRef(({ planet, orbit, points, mesh, index }, ref) => {
  const [posX, posY] = Object.values(points.getPoint(planet.positionIndex));

  const [label, setLabel] = useState(null);

  const labelRef = useRef();

  useEffect(() => {
    if (mesh && index > 0)
      gsap.fromTo(
        mesh.material,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2.2 }
      );
  }, [mesh]);

  useEffect(() => {
    if (label)
      gsap.fromTo(
        label,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 2.5 }
      );
  }, [label]);

  const firstPlanetPositionIndex = useRef(0);

  useEffect(() => {
    gsap.to(firstPlanetPositionIndex, {
      current: 1 + planet.positionIndex,
      duration: 2.2,
      ease: "power1.out",
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
    >
      <sphereGeometry args={[1, 64, 64]} />
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
